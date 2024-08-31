import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/bookshelf.css";
const page = localStorage.getItem("page");
const setCurrentPage = (val: string) => {
  localStorage.setItem("page", val);
};
function Menubookshelf() {
  return (
    <div
      className="menubar-bookshelf"
      style={{ justifyContent: "center", alignContent: "center" }}
    >
      <Link to="/Bookshelf/Followed">
        <span
          style={{
            paddingRight: "15vw",
            paddingLeft: "0vw",
            color: "white",
            fontSize: "18px",
          }}
        >
          การ์ตูนที่ติดตาม
        </span>
      </Link>
      <Link to="/Bookshelf/History">
        <span
          style={{
            paddingRight: "7vw",
            paddingLeft: "7vw",
            color: "white",
            fontSize: "18px",
          }}
        >
          ประวัติการอ่าน
        </span>
      </Link>
      <Link to="/Bookshelf/Bought">
        <span
          style={{
            paddingRight: "0vw",
            paddingLeft: "15vw",
            color: "white",
            fontSize: "18px",
          }}
        >
          ซื้อแล้ว
        </span>
      </Link>
    </div>
  );
}
export default Menubookshelf;
