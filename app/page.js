"use client";

import React, { useState, useRef, useEffect } from "react";
import { currencyFormatter } from "@/lib/utils";
import ExpenseItem from "@/components/ExpenseItem";
import Modal from "@/components/Modal";

import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'

import { Doughnut } from "react-chartjs-2";
import { userAgent } from "next/server";

//Firebase
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, Timestamp } from "firebase/firestore";

//Icons
import {FaRegTrashAlt} from 'react-icons/fa'

ChartJS.register(ArcElement, Tooltip, Legend);

const DUMMY_DATA = [
  {
    id: 1,
    title: "Pet Food",
    color: "#000",
    total: 5000
  },
  {
    id: 2,
    title: "Streaming Services",
    color: "#00f",
    total: 5000
  },
  {
    id: 3,
    title: "Entertainment",
    color: "#D00",
    total: 5000
  },
  {
    id: 4,
    title: "Food",
    color: "#AAA",
    total: 5000
  },
]

export default function Home() {

  const [income, setIncome] = useState([])

  const [showAddIncomeModal, setShowAddIncomeModal] = useState(true);
  const amountRef = useRef()
  const descriptionRef = useRef()

  //Handler Functions
  const addIncomeHandler = async (e) => {
    e.preventDefault()

    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date()
    };

    console.log(newIncome)

    const collectionRef = collection(db, 'income')

    try {
      const docSnap = await addDoc(collectionRef, newIncome);

      //Update State
      setIncome(prevState => {
        return [
          ...prevState,
          {
            id: docSnap.id,
            ...newIncome,
          }
        ]
      });

      descriptionRef.current.value = "";
      amountRef.current.value = "";
      
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteIncomeEntryHandler = async (incomeId) => {
    const docRef = doc(db, 'income', incomeId);
    try {
      await deleteDoc(docRef);
      //Update State
      setIncome((prevState) => {
        return prevState.filter(i => i.id !== incomeId)
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    const getIncomeData = async () => {
        const collectionRef = collection(db, "income");
        const docsSnap = await getDocs(collectionRef);

        const data = docsSnap.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          };
        });

        setIncome(data);
    };

    getIncomeData();
  }, []);

  return (
    <>
    {/* Modal */}

    <Modal show={showAddIncomeModal} onClose={setShowAddIncomeModal}>
      <form onSubmit={addIncomeHandler} className="flex flex-col gap-4">
        <div className="input-group">
        <label htmlFor="amount">Income Amount</label>
        <input name="description" ref={amountRef} type="number"  min={0.01} step={0.01} placeholder="Income Amount" required />
        </div>
        <div className="input-group">
        <label htmlFor="description">Description</label>
        <input name="description" ref={descriptionRef} type="text" placeholder="Enter income description" required />
        </div>

        <button type="submit" className="btn btn-primary ">Add entry</button>
      </form>

      <div className="flex flex-col gap-4 mt-6">
        <h3 className="text-2xl font-bold">Income History</h3>

        {income.map(i => {
          return (
            <div className="flex item-center justify-between" key={i.id}>
              <div>
                <p className="font-semibold">{i.description}</p>
                <small className="text-xs">{i.createdAt.toISOString()}</small>
              </div>
              <p className="flex item-center gap-2">{currencyFormatter(i.amount)}
              <button onClick={() => { deleteIncomeEntryHandler(i.id)}}>
                <FaRegTrashAlt/>
                </button>
              </p>
            </div>
          )
        })}
      </div>
    </Modal>

    <main className="container max-w-2xl mx-auto px-6">
    <section className="py-3">
      <small className="text-gray-400 text-md">My Balance</small>
      <h2 className="text-4xl font-bold">{ currencyFormatter(100000)}</h2>
    </section>

    <section className="flex items-center gap-2 py-3">
      <button onClick={() => {setModalIsOpen(true)}} className="btn btn-primary">+ Expenses</button>
      <button onClick={() => {setShowAddIncomeModal(true)}} className="btn btn-primary-outline">+ Income</button>
    </section>

    {/* Expenses */}
    <section className="py-6">
      <h3 className="text-2xl">My Expenses</h3>
      <div className="flex flex-col gap-4 mt-6">
        {DUMMY_DATA.map((expense) => {
          return (
            <ExpenseItem color={expense.color} title={expense.title} total={expense.total}/>
          )
        })}
      </div>
    </section>

    {/* Chart Section */}

    <section className="py-6">
        <h3 className="text-2xl">Stats</h3>
        <div className="w-1/2 mx-auto">
          <Doughnut data={{
            labels: DUMMY_DATA.map((expense) => expense.title),
            datasets: [
              {
                label: "Expenses",
                data: DUMMY_DATA.map((expense) => expense.total),
                backgroundColor: DUMMY_DATA.map((expense) => expense.color),
                borderColor: ['#18181b'],
                borderWidth: 5,
              }
            ]
          }} />
        </div>
    </section>
  </main>
  </>
  )
}
