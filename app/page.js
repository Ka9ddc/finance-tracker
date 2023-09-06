"use client";

import { useState, useContext, useEffect } from "react";
import { currencyFormatter } from "@/lib/utils";
import ExpenseItem from "@/components/ExpenseItem";

import { financeContext } from "@/lib/store/finance-context";
import { authContext } from "@/lib/store/auth-context";

import { Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'

import { Doughnut } from "react-chartjs-2";
import { userAgent } from "next/server";

import AddIncomeModal from "@/components/modals/AddIncomeModal";
import AddExpenseModal from "@/components/modals/AddExpenseModal";
import SignIn from "@/components/SignIn";


ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);

  const [balance, setBalance] = useState(0)

  const {expenses, income} = useContext(financeContext);

  const {user, loading} = useContext(authContext)

  useEffect(()=> {
    const newBalance = income.reduce((total, i) => {
      console.log(total, i.amount)
      return total + i.amount;
    }, 0) - expenses.reduce((total, e) => {
      console.log(total, e.total, e)
      return total + e.total;
    }, 0)

    setBalance(newBalance)
  }, [expenses, income])

  if(!user){
    return <SignIn />;
  }

  return (
    <>
    {/* Add Income Modal */}
    <AddIncomeModal show={showAddIncomeModal} onclose={setShowAddIncomeModal} />

    {/* Add Expense Modal */}
    <AddExpenseModal show={showAddExpenseModal} onclose={setShowAddExpenseModal} />

    <main className="container max-w-2xl mx-auto px-6">
    <section className="py-3">
      <small className="text-gray-400 text-md">My Balance</small>
      <h2 className="text-4xl font-bold">{ currencyFormatter(balance)}</h2>
    </section>

    <section className="flex items-center gap-2 py-3">
      <button onClick={() => {setShowAddExpenseModal(true)}} className="btn btn-primary">+ Expenses</button>
      <button onClick={() => {setShowAddIncomeModal(true)}} className="btn btn-primary-outline">+ Income</button>
    </section>

    {/* Expenses */}
    <section className="py-6">
      <h3 className="text-2xl">My Expenses</h3>
      <div className="flex flex-col gap-4 mt-6">
        {expenses.map((expense) => {
          return (
            <ExpenseItem key={expense.id} expense={expense}/>
          )
        })}
      </div>
    </section>

    {/* Chart Section */}

    <section className="py-6">
        <h3 className="text-2xl">Stats</h3>
        <div className="w-1/2 mx-auto">
          <Doughnut data={{
            labels: expenses.map((expense) => expense.title),
            datasets: [
              {
                label: "Expenses",
                data: expenses.map((expense) => expense.total),
                backgroundColor: expenses.map((expense) => expense.color),
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
