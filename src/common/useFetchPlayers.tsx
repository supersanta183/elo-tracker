import React from "react";
import { handleFetchPlayers } from "./handlePlayer";
import { IPlayer } from "../../typings";

const useFetchPlayers = (rankType: string) => {
    const [players, setPlayers] = React.useState<IPlayer[]>([]);
    
    const fetchPlayers = async () => {
        const fetchedPlayers: IPlayer[] = await handleFetchPlayers()
        fetchedPlayers.sort((a, b) => ( //sort players by ranks in ascending order
            a[rankType] - b[rankType]
        ))
        setPlayers(fetchedPlayers)
    }
    
    React.useEffect(() => {
        fetchPlayers();
    }, []);

    return {
        players,
        fetchPlayers
    };
}

export default useFetchPlayers;