import React, { useState } from "react";
import "./tracker.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Divider from '@mui/joy/Divider';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Tracker = () => {
  const [history, setHistory] = useState([]);
  const [newTr, setNewTr] = useState({ title: "", amount: "" });
  const [income, setIncome] = useState([]);
  const [expense, setExpense] = useState([]);
  const [balance, setBalance] = useState(0);
  const [incomeBalance, setIncomeBalance] = useState(0);
  const [expenseBalance, setExpenseBalance] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [edited, setEdited] = React.useState({});


  const handleClose = () => setOpen(false);

  const handleClick = () => {
    if (balance + Number(newTr.amount) < 0 ) {
      Swal.fire({
        title: "Error!",
        text: "You do not have enough money!",
        icon: "error",
        confirmButtonText: "Cool",
      });
    } else {
      const obj={ ...newTr, id: uuidv4() }
      const updatedHistory = [...history, obj];
      setHistory(updatedHistory);

      let historySum = 0;
      updatedHistory.forEach((item) => {
        historySum += Number(item.amount);
      });
      setBalance(historySum);

      if(obj.amount.includes("-")){
        const updatedExpense = [...expense, obj];
        setExpense(updatedExpense)

        let expenseSum = 0;
        updatedExpense.forEach((item) => {
          expenseSum+= Number(item.amount);
        });
        setExpenseBalance(expenseSum)

      }else{
        const updatedIncome = [...income, obj];
        setIncome(updatedIncome)

        let incomeSum = 0;
        updatedIncome.forEach((item) => {
          incomeSum += Number(item.amount);
        });
        setIncomeBalance(incomeSum)

      }

      setNewTr({ title: "", amount: "" });
    }
  };

  const handleDelete = (id) => {
    const found = history.find((item) => item.id == id);
    const updatedHistory = history.filter((item) => item.id != id);

    if(balance-Number(found.amount)>=0){
      const updatedBalance=balance-Number(found.amount);
      setBalance(updatedBalance)
  
      if(!found.amount.includes("-")){
          const updatedIncomeBalance=incomeBalance-Number(found.amount);
          const updatedIncome= income.filter((item) => item.id != id);
  
          setIncomeBalance(updatedIncomeBalance)
          setIncome(updatedIncome)
      }else{
          const updatedExpenseBalance=expenseBalance-Number(found.amount);
          const updatedExpense= expense.filter((item) => item.id != id);
  
          setExpenseBalance(updatedExpenseBalance)
          setExpense(updatedExpense)
  
      }
      setHistory(updatedHistory);
    }else{
      Swal.fire({
        title: "Error!",
        text: "Something is gone wrong!",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }

   
  };

  const handleEdit = (id) => {
    const found = history.find((item) => item.id == id);
    setEdited(found)
    setOpen(true);
  };

  const handleEditClick = () => {
    let found=history.find(item=>item.id==edited.id)

   if( balance + Number(edited.amount)>=0){
    const updatedHistory = history.map((item) =>
    item.id === edited.id ? edited : item
  );
  setHistory(updatedHistory);

   const updatedBalance = balance - Number(found.amount) + Number(edited.amount);
   setBalance(updatedBalance);

   let updatedExpenseBalance =0
   updatedHistory.forEach(item=>item.amount.includes("-")?updatedExpenseBalance+=Number(item.amount):null)

   let updatedIncomeBalance =0
   updatedHistory.forEach(item=>!item.amount.includes("-")?updatedIncomeBalance+=Number(item.amount):null)

   setExpenseBalance(updatedExpenseBalance);
   setIncomeBalance(updatedIncomeBalance);

  setEdited({});

   }else{
    Swal.fire({
      title: "Error!",
      text: "Something is gone wrong!",
      icon: "error",
      confirmButtonText: "Cool",
    });
   }
   setOpen(false);
  };

  return (
    <main>
      <div className="tracker">
        <div className="tracker-main">
          <div className="tracker-header">
            <h2>Expense Tracker</h2>
          </div>
          <div className="tracker-balance">
            <h3>Your Balance</h3>
            <h1>&{balance}</h1>
          </div>
          <div className="income-expense">
            <div className="income">
              <span>Income</span>
              <br />
              <span className="income-amount">{incomeBalance}</span>
            </div>
            <Divider orientation="vertical" />
            <div className="expence">
              <span>Expense</span>
              <br />
              <span className="expence-amount">{expenseBalance}</span>
            </div>
          </div>
          <div className="history">
            <h2>History</h2>
            <div className="items">
              {history &&
                history.map((elem) => {
                  return (
                    <div className="history-item" key={elem.id}>
                      <div
                        className="history-item-inner"
                        style={{
                          borderRight:
                            elem.amount > 0
                              ? "10px solid green"
                              : "10px solid red",
                        }}
                      >
                        <div className="item-name">{elem.title}</div>
                        <div className="item-amount">${elem.amount}</div>
                      </div>
                      <IconButton
                        variant="soft"
                        color="danger"
                        onClick={() => {
                          handleDelete(elem.id);
                        }}
                      >
                        <DeleteIcon style={{ color: "red" }} />
                      </IconButton>
                      <IconButton
                        variant="soft"
                        color="success"
                        onClick={() => {
                          handleEdit(elem.id);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="new-transaction">
            <h2>Add new transaction</h2>

            <p>Text</p>
            <TextField
              id="outlined-basic"
              label=""
              value={newTr.title}
              variant="outlined"
              placeholder="Enter title..."
              onChange={(e) => {
                setNewTr((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
            />
            <br />
            <span>Amount</span>
            <p>(negative - expence , positive - income)</p>

            <TextField
                id="outlined-basic"
                label=""
                value={newTr.amount}
                variant="outlined"
              placeholder="Enter amount..."
                onChange={(e) =>
                  setNewTr((prev) => ({ ...prev, amount: e.target.value}))
                }
                style={{marginBottom:"20px"}}
              />

            <Button variant="contained" className="btn" onClick={handleClick}>
              Add Transaction
            </Button>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography variant="h6" component="h2" style={{marginBottom:"20px"}}>
                Update Transaction
              </Typography>
              <Typography>Enter new text</Typography>
              <TextField
                id="outlined-basic"
                label=""
                value={edited.title}
                variant="outlined"
                onChange={(e) =>
                  setEdited((prev) => ({ ...prev, title: e.target.value }))
                }
                style={{marginBottom:"20px"}}
              />
              <br />
              <Typography>Enter new amount</Typography>
              <TextField
                id="outlined-basic"
                label=""
                value={edited.amount}
                variant="outlined"
                onChange={(e) =>
                  setEdited((prev) => ({ ...prev, amount: e.target.value }))
                }
                style={{marginBottom:"20px"}}
              />
              <Button
                variant="contained"
                className="btn"
                onClick={handleEditClick}
                style={{width:"68%"}}
              >
                Update Transaction
              </Button>
            </Box>
          </Modal>
        </div>
      </div>
    </main>
  );
};

export default Tracker;
