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
  const [newTr, setNewTr] = useState({ title: "", amount: 0 });
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [edited, setEdited] = React.useState({});


  const handleClose = () => setOpen(false);

  const handleClick = () => {
    if (balance + newTr.amount < 0) {
      Swal.fire({
        title: "Error!",
        text: "You do not have enough money!",
        icon: "error",
        confirmButtonText: "Cool",
      });
    } else {
      const updatedHistory = [...history, { ...newTr, id: uuidv4() }];
      setHistory(updatedHistory);
      let historySum = 0;
      updatedHistory.forEach((item) => {
        historySum += item.amount;
      });
      setBalance(historySum);

      if (newTr.amount < 0) {
        setExpense((prev) => prev + newTr.amount);
      } else {
        setIncome((prev) => prev + newTr.amount);
      }

      setNewTr({ title: "", amount: 0 });
    }
  };

  const handleDelete = (id) => {
    const found = history.find((item) => item.id == id);
    const updatedHistory = history.filter((item) => item.id != id);
    // if(found.amount>0){
    //     const updatedIncome=income-found.amount;
    //     const updatedBalance=balance-found.amount;
    //     setIncome(updatedIncome)
    //     setBalance(updatedBalance)
    // }else{
    //     const updatedExpense=expense-found.amount;
    //     const updatedBalance=balance-found.amount;
    //     setExpense(updatedExpense)
    //     setBalance(updatedBalance)
    // }
    setHistory(updatedHistory);
  };

  const handleEdit = (id) => {
    const found = history.find((item) => item.id == id);
    setEdited(found)
    setOpen(true);
 
  };

  const handleEditClick = () => {
    let found=history.find(item=>item.id==edited.id)
    const updatedHistory = history.map((item) =>
      item.id === edited.id ? edited : item
    );
    setHistory(updatedHistory);
console.log(edited,"edit")
console.log(newTr,"new")
     const updatedBalance = balance - found.amount + edited.amount;
      setBalance(updatedBalance);

    if (edited.amount < 0) {
      setExpense((prev) => prev - found.amount + edited.amount);
    
    } else {

      setIncome((prev) => prev - found.amount + edited.amount);
     
    }

    setEdited({});
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
              <span className="income-amount">{income}</span>
            </div>
            <div className="expence">
              <span>expense</span>
              <br />
              <span className="expence-amount">{-expense}</span>
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
              id="outlined-number"
              label=""
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setNewTr((prev) => ({
                  ...prev,
                  amount: parseFloat(e.target.value),
                }));
              }}
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
              <Typography variant="h6" component="h2">
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
              />
              <br />
              <Typography>Enter new amount</Typography>
              <TextField
                id="outlined-number"
                label=""
                type="number"
                value={edited.amount}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) =>
                  setEdited((prev) => ({
                    ...prev,
                    amount: parseFloat(e.target.value),
                  }))
                }
              />
              <Button
                variant="contained"
                className="btn"
                onClick={handleEditClick}
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
