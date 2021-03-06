import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity  , Image } from 'react-native';
import {Questions} from "./Constants/Questions"



export default class App extends React.Component {

  constructor(props){
    super(props) ;3
    
   this.state = {
       myQuestion: Questions ,
       q: Math.floor(Math.random()*15),
       score: 0 ,
       questionNo : 1 ,
       totalQuestions : 5 ,
       colorA: "teal" ,
       colorB: "teal" ,
       colorC: "teal" ,
       buttonText: "NEXT" , 
       screen: "home",
       disable: false ,
       disableNext: true ,     
  } ;
}

//Next Button
nextQuestion = () =>{
  if(this.state.questionNo === 4 ){
    
    this.setState({buttonText: "Finish"})
  } 
  if(this.state.buttonText === "NEXT"){
  this.setState({q: Math.floor(Math.random()*15) ,
    colorA: "teal" , colorB: "teal" , colorC: "teal" ,
    questionNo: this.state.questionNo + 1 ,
    disable: false , 
    disableNext : true })
 
  }
  else if(this.state.buttonText === "Finish"){
    this.setState({screen: 'home' , colorA: "teal" , colorB: "teal" , colorC: "teal" ,
    disable: false , 
    disableNext : false})
  }
}
//finds correct option
findCorrectOption = () => {
  if(this.state.myQuestion[this.state.q].answer === this.state.myQuestion[this.state.q].options[0]){
    this.setState({colorA: "green"})
    }
    else if(this.state.myQuestion[this.state.q].answer === this.state.myQuestion[this.state.q].options[1]){
      this.setState({colorB: "green"})
    }
    else if(this.state.myQuestion[this.state.q].answer === this.state.myQuestion[this.state.q].options[2]){
      this.setState({colorC: "green"})
    }

    return 
  }
//Answer evaluation
checkAnswer = (ans , option) => {
  this.setState({disable: true})
  if( this.state.myQuestion[this.state.q].answer === ans ){
   if(option === "a"){
   this.setState({colorA: "green"})
   }
   else if(option === "b"){
    this.setState({colorB: "green"})
   }
   else if(option === "c"){
    this.setState({colorC: "green"})
   }
   
   this.setState({score: this.state.score+1})
   this.setState({disableNext: false})

  }
  else{
    this.setState({disable: true})
    if(option === "a"){
      this.setState({colorA: "red"})
      }
      else if(option === "b"){
       this.setState({colorB: "red"})
      }
      else if(option === "c"){
       this.setState({colorC: "red"})
      }
     this.findCorrectOption() 
     this.setState({disableNext: false})
  
}
 }
  
  render() {
const quizScreen = (
  
    <View style={styles.container}>
      <View style={styles.status}>
        <Text style={{fontSize: 70 , color: "indigo"}}>Score: {this.state.score}</Text>
        </View>
      
      <View style = {styles.Question}>
      <Text style={{fontSize: 22, color: "lightgrey" , paddingBottom: 20}} >
        Question {this.state.questionNo}/{this.state.totalQuestions}</Text>
      
       <Text style = {{fontSize: 33 , color: "white" , textAlign: "center"  }}> {this.state.myQuestion[this.state.q].question} </Text>
      </View>
       
       <View style = {styles.optionArea}>  
      <TouchableOpacity 
       style = {{
        backgroundColor: this.state.colorA ,
        alignItems: "center",
        justifyContent: "center" ,
        padding: 10 ,
        margin : 5 , 
        borderRadius : 5 ,
        marginBottom : 10 , 
        width: 400}} 
        disabled= {this.state.disable}
      onPress = {() => 
      this.checkAnswer( this.state.myQuestion[this.state.q].options[0] ,  "a" )}> 

        <Text  style={{color: "white" , fontSize: 28 }}>
            1.  {this.state.myQuestion[this.state.q].options[0]} </Text>
        </TouchableOpacity>

      <TouchableOpacity 
        style = {{ backgroundColor: this.state.colorB ,
            alignItems: "center",
            justifyContent: "center" ,
            padding: 10 ,
            margin : 5 , 
            borderRadius : 5 ,
            marginBottom : 10 , 
            width: 400}} 
        
            disabled= {this.state.disable}
        onPress = {() => 
          this.checkAnswer(this.state.myQuestion[this.state.q].options[1] , "b") }>
        
        <Text  style={{color: "white" , fontSize: 28 }}>
            2.  {this.state.myQuestion[this.state.q].options[1]}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
        style = {{ backgroundColor: this.state.colorC ,
            alignItems: "center",
            justifyContent: "center" ,
            padding: 10 ,
            margin : 5 , 
            borderRadius : 5 ,
            marginBottom : 10 , 
            width: 400}} 

            disabled= {this.state.disable}
        onPress = {() => 
        this.checkAnswer( this.state.myQuestion[this.state.q].options[2] , "c" )}>
        <Text  style={{color: "white" , fontSize: 28 }}>
           3.    {this.state.myQuestion[this.state.q].options[2]}
          </Text>
        </TouchableOpacity>
      
        </View>
      
      <TouchableOpacity disabled = {this.state.disableNext} onPress = {(this.nextQuestion)} activeOpacity= {0.5} >
       
       <View style= {styles.nextButton}>
         <Text style= {{fontSize: 30 , color: "white"}}>{this.state.buttonText}</Text>
     
      </View>
      </TouchableOpacity>
    </View>
  );

  const homeScreen  =(
  
    <View style = {styles.container} >
      <View style = {styles.lastScore} >
      <Text style={{fontSize: 50 , color: "indigo"}}>Your Last Score: {this.state.score}</Text>
      </View>
     
    <Text style={{fontSize: 30 , color: "white"}}>General Knowledge Quiz</Text>
    
      <TouchableOpacity activeOpacity = {0.8} onPress= { () => this.setState({screen: "quiz" 
                                                        , score: 0 , questionNo: 1 , buttonText: "NEXT" , 
                                                        disableNext :  true})} 
      style={{backgroundColor: "darkslateblue" , 
          padding: 20 , marginTop: 50 ,borderRadius: 35}}>
        <Text style={{fontSize: 20 , color: "silver"}}> START QUIZ</Text>
      </TouchableOpacity>
   </View>
    
  )
   return this.state.screen === 'home' ? homeScreen : quizScreen ;
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rosybrown" ,
    alignItems: 'center',
    justifyContent: 'center',
  },
  status: {
    flexDirection: "row" ,
    justifyContent: "center",
    alignItems: "center" ,
    
    width: 300 ,
    padding: 10
},
homescreen: {
  flex: 1,
  backgroundColor: 'rosybrown',
  alignItems: 'center',
  justifyContent: 'center',
  
},
lastScore:{
  paddingBottom: 50
},
  Question: {
    fontSize: 30,
 
    paddingBottom: 30 ,
    marginTop: 100 ,
    justifyContent: "center",
    alignItems: "center",
    
    
  },


  options : {
    flexDirection : "row" ,
 
    alignItems: "center",
    justifyContent: "center" ,
    padding: 10 ,
    margin : 5 , 
    borderRadius : 5 ,
    marginBottom : 10 , 
    width: 400
  
  },

  optionArea : {
    
    padding: 10 ,
    paddingBottom: 30
   
    
  },
  nextButton: {
    padding: 10 ,
    backgroundColor: "darkslateblue" ,
    width: 100,
    justifyContent: "center" ,
    alignItems: "center",
    borderRadius:30 ,
    },
    backgroundImage:{
      
      width: 500 ,
      height: 1000
      
  },

});
