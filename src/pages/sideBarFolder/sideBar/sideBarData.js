import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { MdOutlineInventory2 } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";



const sideBarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
    },
    {
        title: 'Sales',
        path: '/sales',
        icon: <FaIcons.FaMoneyBillWave />,
    },
    {
        title: 'Orders',
        path: '/orders',
        icon: <BiSolidPurchaseTag />,
    }
    , {
        title: 'Inventory',
        path: '/inventory',
        icon: <MdOutlineInventory2 />
    }
    , {
        title: 'Profile',
        path: '/profile',
        icon: <FaRegUser />
    }
    , {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <FaUserFriends />
    }, {
        title: 'Settings',
        path: '/settings',
        icon: <FaUserFriends />
    }
]
export default sideBarData;