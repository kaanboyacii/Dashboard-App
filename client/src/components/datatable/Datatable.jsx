import "./datatable.scss";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchSuccess } from "../../redux/projectSlice.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useEffect } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const Datatable = ({ type }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentProject } = useSelector((state) => state.project);
  const { darkMode } = useContext(DarkModeContext);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light", // Dark mode'u etkinleştirin veya devre dışı bırakın
      primary: {
        main: "#82C3EC", // Başlık yazı rengi
      },
      secondary: {
        main: "#4B56D2", // Tek numaralı satırlardaki yazı rengi
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRes = await axios.get(`/projects/find/${path}`);
        dispatch(fetchSuccess(projectRes.data));
      } catch (err) {
        console.log("User AUTH Error");
      }
    };
    fetchData();
  }, [path, dispatch]);

  const columns = [
    { field: 'title', headerName: 'Başlık', width: 120 },
    { field: 'category', headerName: 'Kategori', width: 80 },
    {
      field: 'amount',
      headerName: 'Miktar',
      type: 'number',
      width: 90,
      sortComparator: (v1, v2, cellParams1, cellParams2) => {
        const amount1 = parseFloat(v1);
        const amount2 = parseFloat(v2);
        if (amount1 < amount2) {
          return -1;
        }
        if (amount1 > amount2) {
          return 1;
        }
        return 0;
      },
    },
    {
      field: 'date',
      headerName: 'Tarih',
      width: 110,
    },
    {
      field: 'actions',
      headerName: 'Aksiyon',
      width: 80,
      renderCell: (params) => (
        <button
          className="deleteButton"
          onClick={() => deletePaymentOrCost(params.id)}
        >
          Kaldır
        </button>
      ),
    },
  ];
  

  let rows = [];
  if (type === "payments" && currentProject) {
    rows = currentProject.payments.map((payment, index) => ({
      id: payment._id || index, // payment._id mevcutsa kullan, değilse bir indeks değeri kullan
      title: payment.title,
      category: payment.category,
      amount: payment.amount.toLocaleString() + " ₺",
      date: new Date(payment.date).toLocaleDateString(),
    }));
  } else if (type === "costs" && currentProject) {
    rows = currentProject.costs.map((cost, index) => ({
      id: cost._id || index, // cost._id mevcutsa kullan, değilse bir indeks değeri kullan
      title: cost.title,
      category: cost.category,
      amount: cost.amount.toLocaleString() + " ₺",
      date: new Date(cost.date).toLocaleDateString(),
    }));
  }
  

  const deletePaymentOrCost = async (id) => {
    try {
      const confirmed = window.confirm("Silmek istediğinize emin misiniz?");
      if (!confirmed) {
        return;
      }
      if (type === "payments") {
        await axios.delete(`/projects/${path}/payments/${id}`);
      } else if (type === "costs") {
        await axios.delete(`/projects/${path}/costs/${id}`);
      }
      fetchData();
    } catch (err) {
      console.log("Error deleting payment or cost");
    }
  };

  const fetchData = async () => {
    try {
      const projectRes = await axios.get(`/projects/find/${path}`);
      dispatch(fetchSuccess(projectRes.data));
    } catch (err) {
      console.log("User AUTH Error");
    }
  };

  const getRowId = (row) => row.id;
  // const getRowClassName = (params) => {
  //   // İstenilen şartlara göre satırlara sınıf adı ekleyebilirsiniz
  //   if (params.row.id % 2 === 0) {
  //     return "even-row"; // Çift numaralı satırlara even-row sınıfını ekleyin
  //   } else {
  //     return "odd-row"; // Tek numaralı satırlara odd-row sınıfını ekleyin
  //   }
  // };
  const renderPageCount = (params) => {
    const { pagination } = params;
    const pageCount = Math.ceil(pagination.rowCount / pagination.pageSize);
    return `${pageCount} sayfada gösterilen sayfa sayısı`;
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
          pagination
          paginationMode="server"
          pageSize={5}
          rowCount={rows.length}
          onPageChange={(params) => console.log(params)}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          getRowId={getRowId}
          localeText={{
            footerPaginationRowCount: renderPageCount,
            toolbarDensity: 'Yoğunluk',
            toolbarDensityLabel: 'Yoğunluk:',
            toolbarDensityCompact: 'Sıkı',
            toolbarDensityStandard: 'Normal',
            toolbarDensityComfortable: 'Rahat',
            toolbarColumns: 'Sütunlar',
            toolbarFilter: 'Filtre',
            toolbarFilters: 'Filtreler',
            toolbarFiltersTooltipHide: 'Filtreleri gizle',
            toolbarFiltersTooltipShow: 'Filtreleri göster',
            toolbarFiltersTooltipActive: (count) =>
              count !== 1 ? `${count} aktif filtre` : `${count} aktif filtre`,
            toolbarLabel: 'Ara',
            toolbarLabelPlaceholder: 'Ara...',
            toolbarResetFilters: 'Filtreleri sıfırla',
            toolbarExport: 'Dışa aktar',
            toolbarExportLabel: 'Dışa aktar',
            toolbarExportCSV: 'CSV olarak indir',
            toolbarExportCSVTitle: 'CSV indir',
            toolbarExportExcel: 'Excel olarak indir',
            toolbarExportExcelTitle: 'Excel indir',
            toolbarMenu: 'Menü',
            toolbarMenuLabel: 'Menü aç',
            toolbarMenuShowColumns: 'Sütunları göster',
            toolbarMenuFilterRows: 'Satırları filtrele',
            footerRowSelected: (count) =>
              count !== 1 ? `${count} seçili satır` : `${count} seçili satır`,
          }}
        />
      </div>
    </ThemeProvider>
  );
};

export default Datatable;
