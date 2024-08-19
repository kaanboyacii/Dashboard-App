import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";

const CategoryPie = () => {
  const { currentProject } = useSelector((state) => state.project);
  const [costCategories, setCostCategories] = useState([]);
  const [paymentCategories, setPaymentCategories] = useState([]);
  const [costs, setCosts] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchCostsAndPayments = async () => {
      if (currentProject && currentProject._id) {
        try {
          const costsRes = await axios.get(`/costs/${currentProject._id}`);
          const paymentsRes = await axios.get(
            `/payments/${currentProject._id}`
          );
          setCosts(costsRes.data);
          setPayments(paymentsRes.data);
        } catch (err) {
          console.log("Veriler alınırken hata oluştu:", err);
        }
      }
    };

    fetchCostsAndPayments();
  }, [currentProject]);

  useEffect(() => {
    const fetchCostCategories = async () => {
      try {
        const res = await axios.get(`/cost-category/${currentProject._id}`);
        setCostCategories(res.data);
      } catch (err) {
        console.error("Maliyet Kategori verileri alınamadı:", err);
      }
    };

    fetchCostCategories();
  }, [currentProject._id]);

  useEffect(() => {
    const fetchPaymentCategories = async () => {
      try {
        const res = await axios.get(`/payment-category/${currentProject._id}`);
        setPaymentCategories(res.data);
      } catch (err) {
        console.error("Ödeme Kategori verileri alınamadı:", err);
      }
    };

    fetchPaymentCategories();
  }, [currentProject._id]);

  // Kategorileri sayma ve isimleri eşleştirme
  const calculateCategoryData = (categories, items, categoryKey, amountKey) => {
    const categoryMap = new Map();
    categories.forEach((category) => {
      categoryMap.set(category._id, category.name);
    });

    const categoryTotals = {};

    items.forEach((item) => {
      const categoryId = item[categoryKey];
      const amount = item[amountKey];
      const categoryName = categoryMap.get(categoryId);

      if (categoryName) {
        if (categoryTotals[categoryName]) {
          categoryTotals[categoryName] += amount;
        } else {
          categoryTotals[categoryName] = amount;
        }
      }
    });

    return Object.keys(categoryTotals).map((name) => ({
      id: name,
      value: categoryTotals[name],
      label: name,
    }));
  };

  const costData = calculateCategoryData(
    costCategories,
    costs,
    "category",
    "amount"
  );
  const paymentData = calculateCategoryData(
    paymentCategories,
    payments,
    "category",
    "amount"
  );

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div>
        <h3>Maliyet Kategorileri</h3>
        <PieChart series={[{ data: costData }]} width={400} height={400} />
      </div>
      <div>
        <h3>Ödeme Kategorileri</h3>
        <PieChart series={[{ data: paymentData }]} width={400} height={400} />
      </div>
    </div>
  );
};

export default CategoryPie;
