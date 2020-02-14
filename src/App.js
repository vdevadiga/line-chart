import React, { Component } from 'react';
import { LineChart } from 'react-chartkick'
import 'chart.js'
import './App.css'
import Data from './data';

class App extends Component {
  dummyData = new Data()
  data = this.dummyData.data['rule']
  array = []

  state = {
    category: "",
    reviewStatus: "",
    condition: ''
  }

  eligibility = () => {
    this.setState({ category: "Eligibility Check", condition: true })
    this.array = []
  }
  rejection = () => {
    this.setState({ category: "REJECTION_RULE", condition: true })
    this.array = []
  }
  account = () => {
    this.setState({ category: "BANK_ACCOUNT_VERIFICATION", condition: true })
    this.array = []
  }
  accountName = () => {
    this.setState({ category: "BANK_ACCOUNT_NAME_VERIFICATION", condition: true })
    this.array = []
  }
  reviewStatusPassed = () => {
    this.setState({ reviewStatus: "PASSED", condition: false })
    this.array = []
  }
  reviewStatusRejected = () => {
    this.setState({ reviewStatus: "REJECTED", condition: false })
    this.array = []
  }
  refresh = () => {
    this.setState({ condition: '' })
    this.array = []
  }

  //Array of all Unique rule ID
  ruleId = Object.entries(this.data).map(rId => rId[1].ruleId).filter((item, index, inputArray) => {
    return inputArray.indexOf(item) === index;
  });


  render() {

    this.ruleId.map(id => {
      let all = { 'name': id, 'data': {} }
      this.array.push(all)
    })

    if (this.state.condition === true) {
      //adding data values to formatted array
      this.array.map((item) => {
        Object.entries(this.data).map(ruleData => {
          if (ruleData[1].ruleId === item.name) {
            if (ruleData[1].category === this.state.category)
              return item.data[ruleData[1].weekNumber] = ruleData[1].count
          }
        })
      })
    }
    else if (this.state.condition === false) {
      //adding data values to formatted array
      this.array.map((item) => {
        Object.entries(this.data).map(ruleData => {
          if (ruleData[1].ruleId === item.name) {
            if (ruleData[1].reviewStatus === this.state.reviewStatus)
              return item.data[ruleData[1].weekNumber] = ruleData[1].count
          }
        })
      })
    }
    else {
        //adding data values to formatted array
        this.array.map((item) => {
          Object.entries(this.data).map(ruleData => {
            if (ruleData[1].ruleId === item.name) {
              return item.data[ruleData[1].weekNumber] = ruleData[1].count
            }
          })
        })
    }


    this.array = this.array.map(nameAnddata => {
      let name = nameAnddata.name
      let data = nameAnddata.data
      var sortable = [];
      var objSorted = {}
      
      for (var item in data) { 
        sortable.push([item, data[item]]) 
      }

      sortable.sort((a, b) => a[0] - b[0]);

      sortable.forEach(item => { 
        objSorted[item[0] + " "] = item[1] 
      })
      
      return { 'name': name, 'data': objSorted }
    })


    return (
      <div className="App">
        <LineChart data={this.array} download={{ background: "#fff" }} height="500px" xtitle="Week Number" ytitle="Count" library={{ backgroundColor: "yellow" }} />
        <span className="span-b" onClick={this.refresh}>Refresh</span>
        <div className="flex">
          <span className="span-b" onClick={this.eligibility}>Eligibility Check</span>
          <span onClick={this.rejection}>Rejection Rule</span>
          <span onClick={this.accountName}>Bank Account Name Verification</span>
          <span onClick={this.account}>Bank Account Verification</span>
          <span onClick={this.reviewStatusPassed}>PASSED</span>
          <span onClick={this.reviewStatusRejected}>REJECTED</span>
        </div>
      </div>
    );
  }
}

export default App;