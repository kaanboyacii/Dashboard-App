import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Logo from "./../../images/logo.jpg";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const convertToBase64 = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = function () {
      reject("Logo yüklenemedi.");
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  });
};

export const generatePDF = async (currentProject, costs, payments) => {
  try {
    const logoBase64 = await convertToBase64(Logo);

    const profitRate = currentProject?.profitRate || 0;
    const balance = currentProject?.balance || 0;
    const profitRateDecimal = profitRate / 100;

    const updatedBalance = profitRate
      ? balance * (1 + profitRateDecimal)
      : balance;

    const docDefinition = {
      content: [
        {
          image: logoBase64,
          width: 200,
          absolutePosition: { x: 10, y: 10 },
        },
        { text: "Proje Bilgileri", style: "header", margin: [0, 50, 0, 10] },
        {
          table: {
            body: [
              ["Başlık", currentProject?.title || ""],
              ["Açıklama", currentProject?.desc || ""],
              ["Durum", currentProject?.status || ""],
              ["İletişim", currentProject?.contact || ""],
              ["Kar Oranı", profitRate ? `%${profitRate}` : "Yok"],
              ["Bakiye", `${balance} ₺`],
              ["Kar / Zarar", `${currentProject?.earning || ""} ₺`],
              [
                "Toplam Alınan Ödeme",
                `${currentProject?.totalPayments || ""} ₺`,
              ],
              ["Toplam Maliyet", `${currentProject?.totalCosts || ""} ₺`],
            ],
          },
        },
        { text: "Maliyetler", style: "subheader", margin: [0, 20, 0, 10] },
        costs.length > 0
          ? {
              table: {
                body: [
                  ["Başlık", "Kategori", "Miktar", "Tarih"],
                  ...costs.map((cost) => [
                    cost.title,
                    cost.category,
                    `${cost.amount} ₺`,
                    new Date(cost.date).toLocaleDateString(),
                  ]),
                ],
              },
            }
          : { text: "Maliyet kaydı yok.", italics: true },
        { text: "Ödemeler", style: "subheader", margin: [0, 20, 0, 10] },
        payments.length > 0
          ? {
              table: {
                body: [
                  ["Başlık", "Kategori", "Miktar", "Tarih"],
                  ...payments.map((payment) => [
                    payment.title,
                    payment.category,
                    `${payment.amount} ₺`,
                    new Date(payment.date).toLocaleDateString(),
                  ]),
                ],
              },
            }
          : { text: "Ödeme kaydı yok.", italics: true },
        {
          text: profitRate
            ? `Güncellenmiş Bakiye (%${profitRate})`
            : "Toplam Bakiye",
          style: "footer",
          margin: [0, 20, 0, 0],
        },
        {
          text: `${updatedBalance.toFixed(2)} ₺`,
          style: "footer",
          margin: [0, 0, 0, 20],
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          marginBottom: 10,
        },
        subheader: {
          fontSize: 15,
          bold: true,
        },
        footer: {
          fontSize: 12,
          bold: true,
          alignment: "right",
        },
      },
      defaultStyle: {
        font: "Roboto",
      },
    };

    pdfMake
      .createPdf(docDefinition)
      .download(`${currentProject?.title || "Proje"}-bilgileri.pdf`);
  } catch (error) {
    console.error("PDF oluşturulurken hata oluştu:", error);
  }
};
