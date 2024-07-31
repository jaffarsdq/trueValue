import { Button } from "@mui/material";
import "./myeditor.css";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const MyEditor = () => {
    const [value, setValue] = useState("");
    const saveContent = () => {
        localStorage.setItem("emailContent", value);
        console.log(value, "Saved content")
    };

    const loadContent = () => {
        const savedContent = localStorage.getItem("emailContent");
        if (savedContent) {
            setValue(savedContent);
        }
    };

    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ header: "1" }, { header: "2" }],
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ align: [] }],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    const formats = [
        "font",
        "header",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "color",
        "background",
        "script",
        "blockquote",
        "code-block",
        "list",
        "bullet",
        "indent",
        "direction",
        "align",
        "link",
        "image",
        "video",
    ];

    return (
        <div
            style={{
                border: "1px solid #ccc",
                padding: "10px",
                minHeight: "200px",
            }}
        >
            <Button variant="contained" color="secondary" onClick={saveContent}>Save Content</Button>
            {/* <Button onClick={loadContent}>Load Content</Button> */}
            <ReactQuill
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
            />
        </div>
    );
};

export default MyEditor;
