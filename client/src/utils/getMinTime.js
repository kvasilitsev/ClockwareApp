const minTime = (date) => {
   
    const selectedBokingDate = new Date(date);
    const selectedYear = selectedBokingDate.getFullYear();
    const selectedMonth = selectedBokingDate.getMonth();
    const selectedDate = selectedBokingDate.getDate();    
     
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();
    const todayHour = today.getHours();

    if((todayYear === selectedYear && todayMonth === selectedMonth && todayDate === selectedDate) || !date ){
        if(todayHour > 15){
            return new Date().setHours(16);
        } else if(todayHour < 7) {
            return new Date().setHours(7)
        } else {
            return new Date().setHours(todayHour);
        }
    } else {
        return new Date().setHours(7);
    }
}

export default minTime;  
  