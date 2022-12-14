import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [books, setBooks] = useState([])
  const [hasMore, setHasMore] = useState(false)
 
  const limit = 100;
  
  // When changed the query (Search text)
  // remove all books from the array
  useEffect(() => {
    setBooks([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)
    //setBooks([])
    let cancel
    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: { q: query, page: pageNumber, limit: limit},
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      
      let latestBooks = []

      setBooks(prevBooks => {
        //Here sorrounded by SET to make a unique book items
        //Sinc we use book title as for the key of book component at render time..
        //..book title should be unique   
        return [...new Set([...prevBooks, ...res.data.docs.map(b => b.title)])]
        
        // No unique items maintaining
        //return [...prevBooks, ...res.data.docs.map(b => b.title)]
        
        // -- This logic keep only latest fetched items limited to specified numbers in <limit>
        // latestBooks = [...new Set([...prevBooks, ...res.data.docs.map(b => b.title)])]
        // const slicePoint = latestBooks.length - ( limit * 2 )
        // return (slicePoint>0) ? latestBooks.slice(slicePoint): latestBooks

      })

      setHasMore(res.data.docs.length > 0)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [query, pageNumber])

  // After each fetch over we know  has More book to fetch or not
  // If no any Error and books fetched Then outputting books and loading state
  // Othewise if Error Then outputting error and loading state
  return { loading, error, books, hasMore }
}