import React, { useEffect, useState } from "react";
import TransactionUI from "./TransactionUI";
import { openModal, closeModal } from "../../store/actions/modalAction";
import { useDispatch } from "react-redux";
import AddExpanceController from "./AddExpance/AddExpanceController";
import UpdateExpanceController from "./UpdateExpance/UpdateExpanceController"
import AddCategoryController from "./AddCategory/AddCategotyController";
import { callApiAction } from "../../store/actions/commonAction";
import { getCategoryApi, deleteCategoryApi } from "../../apis/category.api";
import UpdateCategoryController from "./UpdateCategory/UpdateCategoryController";
import { getTrasactionApi, deleteTransactionApi } from "../../apis/trasaction.api";
import { LIST_VIEW_TIME, TRANSACTION_FETCH_TYPE } from "../../utils/constants";

const TransactionController = () => {
    const [loading, setLoading] = useState(false);
    const [expanseLoading, setExpanseLoading] = useState(false)
    const [date, setDate] = useState(new Date());
    const [search, setSearch] = useState("");
    const [expanseData, setExpanseData] = useState([]);
    const [categorydata, setCategoryData] = useState({});
    const [filters, setFilters] = useState({
        pageNo: 1,
        pageSize: 10,
        search: "",
        role: null,
        searchable: ["name", "email"],
    });
    const dispatch = useDispatch();
    const addNewExpanceModal = () => {
        dispatch(
            openModal({
                title: "Add New Expance",
                component: <AddExpanceController fetchTransaction={fetchTransaction} />,
                size: "sm"
            })
        );
    }
    const fetchList = () => {
        setLoading(true)
        dispatch(callApiAction(
            async () => await getCategoryApi(),
            (response) => {
                setCategoryData(response)
                setLoading(false)
            },
            (err) => {
                console.log(err)
                setLoading(false)
            }
        ))
    }

    const fetchTransaction = () => {
        setExpanseLoading(true)
        console.log({ transactionFetchType: TRANSACTION_FETCH_TYPE.LIST_VIEW, listViewTime: LIST_VIEW_TIME.ALL, ...filters, ...search });
        dispatch(callApiAction(
            async () => await getTrasactionApi({ transactionFetchType: TRANSACTION_FETCH_TYPE.LIST_VIEW, listViewTime: LIST_VIEW_TIME.ALL, ...filters, search }),
            (response) => {
                setExpanseData(response)
                setExpanseLoading(false)
            },
            (err) => {
                console.log(err)
                setExpanseLoading(false)
            }
        ))
    }

    const fetchTransactionByDate = () => {
        setExpanseLoading(true)
        dispatch(callApiAction(
            async () => await getTrasactionApi({ transactionFetchType: TRANSACTION_FETCH_TYPE.LIST_VIEW, listViewTime: LIST_VIEW_TIME.DATE, date: date, ...filters }),
            (response) => {
                setExpanseData(response)
                setExpanseLoading(false)
            },
            (err) => {
                console.log(err)
                setExpanseLoading(false)
            }
        ))
    }
    const AddCategory = (row) => {
        dispatch(
            openModal({
                title: "Add Category",
                component: <AddCategoryController fetchList={fetchList} />,
                size: "sm"
            })
        )
        fetchList();
    }
    const updateCategory = (row) => {
        dispatch(
            openModal({
                title: "Update Category",
                component: <UpdateCategoryController row={row} />,
                size: "sm"
            })
        )
    }
    const updateExpance = (row) => {
        dispatch(
            openModal({
                title: "Update Expance",
                component: <UpdateExpanceController row={row} />,
                size: "sm"
            })
        )
        fetchTransaction();
    }

    const deleteCategory = (id) => {
        dispatch(callApiAction(
            async () => await deleteCategoryApi({ id: id }),
            (response) => {
                setLoading(false)
                // window.location.reload(true);
                fetchList();
            },
            (err) => {
                console.log(err)
                setLoading(false)
            }
        ))
    }
    const deleteExpance = (id) => {
        dispatch(callApiAction(
            async () => await deleteTransactionApi({ id: id }),
            (response) => {
                setLoading(false)
                fetchTransaction();
            },
            (err) => {
                console.log(err)
                setLoading(false)
            }
        ))
    }
    useEffect(() => {
        fetchList();
    }, [])
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchTransaction();
        }, 500)

        return () => clearTimeout(timer)

    }, [search, filters])
    useEffect(() => {
        fetchTransactionByDate();
    }, [date])

    return (
        <>
            <TransactionUI loading={loading} expanseLoading={expanseLoading} date={date} setDate={setDate} search={search} setSearch={setSearch} expanseData={expanseData} filters={filters} setFilters={setFilters} addNewExpanceModal={addNewExpanceModal} updateExpance={updateExpance} AddCategory={AddCategory} categorydata={categorydata} updateCategory={updateCategory} deleteCategory={deleteCategory} deleteExpance={deleteExpance} />
        </>
    )
}

export default TransactionController;