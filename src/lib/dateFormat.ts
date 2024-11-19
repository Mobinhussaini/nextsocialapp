export const DateFormatter = ({date}: {date: Date})=> {
    const newDate = new Date(date); 

    const formattedDate = newDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    

    return formattedDate; 

}