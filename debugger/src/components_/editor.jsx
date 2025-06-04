import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

function EditorApp(props) {
	const [width, setWidth] = useState(window.innerWidth);
	const [editorValue, setEditorValue] = useState("");

	useEffect(() => {
		const handleResize = (e) => {
			setWidth(e.target.innerWidth);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(()=>{
		props.setCode(editorValue)
	},[editorValue])

	const handleEditorChange = (value) => {
		setEditorValue(value);
	};

	return (
		<div >
			<Editor
				height="90vh"
			
				theme={props.mode === "light" ? "vs-light" : "vs-dark"}
				defaultLanguage="python" // Change to your desired default language
				value={editorValue}
				onChange={handleEditorChange}
			/>
		</div>
	);
}

export { EditorApp };
