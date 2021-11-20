import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../contexts/UserContext'
import Button from '../components/Button'

function MenuInfoPage() {

    // NEED TO COMMENT LAHAT NG CODE DITO :)
    
    const[userIDNumber, setUserIDNumber, menuID, setMenuID, quantity, setQuantity,,,,setAddedToCart] = useContext(UserContext)
    const [currentMenu, setCurrentMenu] = useState([])

    /** A useEffect function that 
     * gets the data of the specified 
     * menu on first render based on 
     * its 'menu_id'. */
    useEffect(() => {

        const id_number = window.sessionStorage.getItem('idNumber');
        const menu_id = window.sessionStorage.getItem('menuID');

        /**
         * check if the id_number at sessionStorage is not empty,
         * if not, then set the userIDNumber at UserContext to the
         * value of idNumber at sessionStorage.
         */
        if (id_number) 
            setUserIDNumber(id_number)

        /**
         * check if the menu_id at sessionStorage is not empty,
         *  if not, then set the menuID at UserContext to the
         * value of menuID at sessionStorage
         */
        if (menu_id)
            setMenuID(menu_id)

        fetch('http://localhost:3001/get-menu-id', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({menuID})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data) // For Testing
            setCurrentMenu(JSON.parse(data))
        })
    }, [menuID])

    async function addToCart() {

        const res = await fetch('http://localhost:3001/add-to-bag', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userIDNumber, menuID, quantity})
        })

        let data = await res.json()

        setAddedToCart(true)
        
        console.log(data) // For Testing
    }

    async function updateMenuQuantity(newQty) {

        const res = await fetch('http://localhost:3001/add-quantity', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userIDNumber, menuID, newQty})
        })

        let data = await res.json()

        console.log(data) // For Testing
    }

    function increaseQuantity() {

        fetch('http://localhost:3001/get-cart-item', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({userIDNumber, menuID})
        })
        .then(res => res.json())
        .then(data => {

            /** The return value is the current quantity of the specified
             * menu, so we add it to the quantity from the UserContext. */
            const currentQuantity = JSON.parse(data)[0]['quantity']; 

            updateMenuQuantity(currentQuantity + quantity)

            
            console.log('updated qty') // for testing
        })
    }

    const isAlreadyOnBag = () => {

        fetch('http://localhost:3001/get-cart-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userIDNumber, menuID})
        })
        .then(res => res.json())
        .then(data => {

            /** The return value is an array, so 
             * if it is empty, it means the current
             * menu is not on the cart, then we add it. */
            if (JSON.parse(data).length < 1)
                addToCart()
            else {
                increaseQuantity()
            }
        })
    }

    return (
        <div className="flex justify-center items-center p-2">

            <div className="card sm:max-w-xl lg:max-w-xl w-full border border-pnc">
                <figure>
                    <img className="w-full" src={`../../assets/${currentMenu.length > 0 && currentMenu[0]['image_path']}`} alt="" />
                </figure>
                <div className="card-body gap-4">
                    <h1 className=" titles">{currentMenu.length > 0 && currentMenu[0]['menu']}</h1>
                    
                    {/* Price and Quantity Buttons */}
                    <section className="flex flex-col gap-5 md:flex-row md:items-center">
                        <small className="text-4xl font-serif font-extrabold">${currentMenu.length > 0 && currentMenu[0]['menu_price']}</small>
                        <div className="flex gap-3">
                            <p className="font-normal">Qty: </p>
                            <section className="btn-group">
                                <Button onClick={() => setQuantity(prevQty => prevQty > 1 ? prevQty - 1 : prevQty)} className="qty-btn" text="-"/>
                                <Button className="quantity" text={quantity} />
                                <Button onClick={() => setQuantity(prevQty => prevQty + 1)} className="qty-btn" text="+"/>
                            </section>
                        </div>
                    </section>
                    
                    <section className="card-actions">
                        <Button onClick={() => {

                            isAlreadyOnBag()
                            
                        }} className="button bg-transparent" text="Add to Bag"/>
                        <Button className="button" text="Buy Now"/>
                    </section>
                    
                </div>
            </div>
        </div>
    )
}

export default MenuInfoPage