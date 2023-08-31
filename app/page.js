"use client";

import { useState } from "react";
import { currencyFormatter } from "@/lib/utils";
import ExpenseItem from "@/components/ExpenseItem";
import Modal from "@/components/Modal";

import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'

import { Doughnut } from "react-chartjs-2";

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

  const [modalIsOpen, setModalIsOpen] = useState(true);

  return (
    <>
    {/* Modal */}

    <Modal show={modalIsOpen} onClose={setModalIsOpen}><h3>Oasis Latino on Zushi Beach</h3></Modal>

    <main className="container max-w-2xl mx-auto px-6">
    <section className="py-3">
      <small className="text-gray-400 text-md">My Balance</small>
      <h2 className="text-4xl font-bold">{ currencyFormatter(100000)}</h2>
    </section>

    <section className="flex items-center gap-2 py-3">
      <button onClick={() => {setModalIsOpen(true)}} className="btn btn-primary">+ Expenses</button>
      <button onClick={() => {setModalIsOpen(true)}} className="btn btn-primary-outline">+ Income</button>
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
