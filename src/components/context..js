import React, {useState, useContext, useEffect} from "react";
import { useCallback } from "react";
const URL = "";
const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resultTitle, setResultTitle] = useState("");

    const fetchBooks = useCallback(async() => {
        setLoading(true);
        try{
            const response = await fetch(`${URL}${searchTerm}`);
            const data = await response.json();
            console.log(data);
            const {docs} = data;
            console.log(docs);
            
            if(docs){
                const newBooks = docs.slice(0, 20).map((bookSingle) => {
                const {name, sex, breed, img, chipNumber, owner, lastname, phoneNumber} = bookSingle;

                return {
                    id: chipNumber,
                    img: img,
                    name: name,
                    sex: sex,
                    breed: breed,
                    owner: owner,
                    lastname: lastname,
                    phoneNumber: phoneNumber,
                    present: true/false

                }
                });

                setBooks(newBooks);

                if(newBooks.length > 1) {
                    setResultTitle("Your Search Result");
                } else {
                    setResultTitle("No Search Result Found!")
                }

            } else {
                setBooks([]);
                setResultTitle("No Search Result Found!");
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            }
        },[searchTerm]);

        useEffect(() => {
            fetchBooks();
        }, [searchTerm, fetchBooks]);

        return (
            <AppContext.Provider value = {{loading, books, setSearchTerm, resultTitle, setResultTitle,}}>
                {children}
            </AppContext.Provider>
        )
    }

export const useGlobalContext = () => {
    return useContext(AppContext);
}
export {AppContext, AppProvider};
