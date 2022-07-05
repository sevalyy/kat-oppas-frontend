import { Container } from "@mui/system";

export const Request = () => {
  //   [description, setDescription] = useState("");
  //   const description = useSelector(selectDescription);
  //   const dispatch = useDispatch();
  //  add onchange to description field  onChange={(e) => dispatch(someaction(e.target.value))}
  return (
    <Container>
      <img alt="Cat" src="https://cataas.com/cat?width=300" />
      {/* 
      <div class="col">
                    <label for="date">Date</label>
                    <input type="date" onload="getDate()" class="form-control" id="date" 
                      name="date">
                </div>
      function getDate(){
    var today = new Date();
document.getElementById("date").value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
} */}
      Starting Date: <label for="start">Start date:</label>
      <input
        type="date"
        id="start"
        name="trip-start"
        value="2022-07-22"
        min="2022-07-22"
        max="2023-12-31"
      ></input>
      End Date: <label for="start">Start date:</label>
      <input
        type="date"
        id="end"
        name="trip-end"
        value="2022-07-22"
        min="2022-07-22"
        max="2023-12-31"
      ></input>
      <input type="text" value="write something about your cat"></input>
    </Container>
  );
};
