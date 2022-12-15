import React, { useState, useRef, useCallback, useEffect } from 'react'
import useBookSearch from './useBookSearch'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export default function InfiniteScrolling() {

  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [autoScroll, setAutoScroll] = useState(false)

  const {
    books,
    hasMore,
    loading,
    error
  } = useBookSearch(query, pageNumber)

  const counterRef = useRef(0)

  useEffect(()=>{
    if (!autoScroll) return
    if (loading) return
    if (hasMore) handleClickScroll();
  },[loading, hasMore])

  function handleClickScroll(){
    var element = document.querySelector(".last-element"); 
    if (element==null) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'end'});
  }

  // The useRef Hook allows you to persist values between renders.
  // It can be used to store a mutable value that does not cause a re-render when updated.
  // It can be used to access a DOM element directly
  const observer = useRef()

  // The React useCallback Hook returns a memoized callback function.
  // Think of memoization as caching a value so that it does not need to be recalculated.
  // This allows us to isolate resource intensive functions so that they will not automatically run on every render.
  // The useCallback Hook only runs when one of its dependencies update  
  //    This function will fire last element rendering time for each fetch
  const lastBookElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    // at Every fire, New IntersectionObserver will set in observer ref
    observer.current = new IntersectionObserver(entries => {
      // Intersection Observer trigger a Function when Scrolling to an Element
      // Intersect is happen when scrollbar everytime hit the bottom
      if (entries[0].isIntersecting && hasMore) {
        // when scrollbar hit the bottom and if has more pages available to fetch
        setPageNumber(prevPageNumber => prevPageNumber + 1)
        // Note: set setPageNumber will cause to rerender and 
        // so fetch happen with new page number and same Query string 
      }
    })
    if (node) observer.current.observe(node)
  // init loading - true // fetching loading - true // afterFetch loading - false 
  // so loading state only change when fech started and fetch ends
  // In here since loading==true just return Only effective when loading change from..
  // .. true to false which is after each fetch 
  // hasMore only change when there's no any pages left to fetch
  }, [loading, hasMore]) // The useCallback Hook only runs when one of its dependencies update
  
  function handleSearch(e) {
    // Each time serch text change consider as a new search so page number set to 1
    setQuery(e.target.value)
    setPageNumber(1)
  }

  function handleAutoScroll(e){
    setAutoScroll(prevSetting => !prevSetting)
    if (hasMore) {
      setPageNumber(prevPageNumber => prevPageNumber + 1)
    }    
  }

  const bookStyle = {
    "marginLeft": "10px",  
    "paddingTop": "90px"
  }

  const msgStyle = {
    "marginLeft": "10px",  
  } 

  const bookElements =  books.map((book, index) => {
    const sn = index+1+( (pageNumber-1)*100);

    if (books.length === index + 1) {
      // ref - To access actual DOM nodes in React, we use the ref prop.
      // Usually you would probably pass a ref object using createRef or 
      // useRef but the ref prop can also take a function, this is referred to as a “callback ref”.
      // This function will fire when the element mounts and unmounts from the DOM.
      //                                                 key should be unique
      //                                                 Otherwise rendering not happen properly 
      return <div className='last-element' ref={lastBookElementRef} key={book}> {sn}. {book} </div>
    } else {
      //  key should be unique
      //  Otherwise rendering not happen properly 
      return <div key={book} > {sn}. {book}</div>
    }
  })

  return (
    <>
      {/* { console.log("bookElements.length " + bookElements.length) } */}
      {/* <div onClick={handleClickScroll} >{new Date().getMinutes() }</div> */}
      {/* <input type="text" value={query} onChange={handleSearch}></input> */}
      <Box sx={{ position: 'fixed', width: '100%', display:'flex', gap: 1, backgroundColor: 'white'}}  >
      <TextField
              sx={{ m:2}} 
              value={query}
              onChange={handleSearch}
              margin="normal"
              required
              fullWidth
              id="search"
              label="search text"
              name="search"
              autoComplete="search"
              autoFocus
            />
            <Button
              onClick={handleAutoScroll}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, mr: 2 }}
            > { autoScroll ? "Auto: ON" : "Auto: OFF" }
            </Button>
      </Box>
      <div style={bookStyle} >{ bookElements } </div>
      <div style={msgStyle}>{loading && 'Loading...'}</div>
      <div style={msgStyle}>{error && 'Error'}</div>
    </>
  )
}


