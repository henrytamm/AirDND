import { useHistory } from "react-router-dom";

const CreateSpotButton = () => {
    const history = useHistory();
    const createSpot = () => {
        history.push('/new')
    }


    return (
        <button onClick={createSpot}> Create New Spot </button>
    )
}

export default CreateSpotButton