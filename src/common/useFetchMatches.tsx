import { useState, useEffect } from 'react'
import { handleFetchMatches } from '@/common/handleMatchEmilio183'
import { handleFetchBTMatches } from './handleBTMatch'
import { IMatch, IBTMatch } from '../../typings'

const useFetchMatches = (matchType: string) => {
    const [matches, setMatches] = useState<IMatch[] | IBTMatch[]>([])

    const fetchMatches = async (amount: number) => {
        let fetchedMatches: IMatch[] | IBTMatch[] = [];
        switch (matchType) {
            case "bf":
                fetchedMatches = await handleFetchMatches(amount)
                break;
            case "bt":
                fetchedMatches = await handleFetchBTMatches(amount)
                break;
        
            default:
                break;
        }
        setMatches(fetchedMatches)
    }

    useEffect(() => {
        fetchMatches(20)
    }, [])

    return { matches, fetchMatches }
}

export default useFetchMatches
