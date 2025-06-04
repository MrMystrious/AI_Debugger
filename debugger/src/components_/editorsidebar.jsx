import React from "react";
import { FaFile, FaCaretDown, FaCaretRight, FaMinus } from "react-icons/fa";

function Folder(props) {
	const [showFiles, setShowFiles] = React.useState(true);
	const [addNewFile, setAddNewFile] = React.useState(false);

	//const currentModule = { module_name: "MyModule", _id: "123" }; // mocked

	let name = props.items.name.split("/").filter((ele) => ele.trim() !== "");
	let folder = name[name.length - 1];
	let files = props.items.files.map((elem) => {
		let temp = elem.split("/").filter((ele) => ele.trim() !== "");
		return temp[temp.length - 1];
	});

	function getFileName(e) {
		let value = e.target.value;
		if (e.keyCode === 13) {
			if (!value.includes(".")) {
				setAddNewFile(false);
				return;
			}
			if (!["py", "cpp", "c", "java", "js"].includes(value.split(".")[1])) {
				e.target.value = "";
				setAddNewFile(false);
				return;
			}
			let newFile = `${props.items.name}${value}`;
			props.setFilesInOrder((prev) => {
				return {
					...prev,
					[props.items.name]: [...prev[props.items.name], newFile],
				};
			});
			setAddNewFile(false);
		}
	}

	return (
		<div className={`w-full h-auto flex flex-col mt-1`}>
			<div className={`flex flex-row ring-1 justify-evenly rounded-md pb-2`}>
				<span className={`cursor-pointer`}>
					{showFiles ? (
						<FaCaretDown className={`relative top-1`} onClick={() => {
							setShowFiles((prev) => !prev);
							setAddNewFile(false);
						}} />
					) : (
						<FaCaretRight className={`relative top-1`} onClick={() => {
							setShowFiles((prev) => !prev);
							setAddNewFile(false);
						}} />
					)}
				</span>
				<span className={`font-extrabold relative text-md`}>
					{folder}
				</span>
				<span className={`relative top-2 cursor-pointer`}>
					<FaFile
						size={10}
						onClick={() => setAddNewFile(true)}
					/>
				</span>
			</div>
			{showFiles && (
				files.length > 0 ? (
					<div className={`flex flex-col`}>
						{files.map((file) => (
							<div
								key={file}
								className={`my-1 rounded-md font-sans font-medium text-sm flex flex-rows justify-between cursor-pointer ring-1 ${
									props.currentFile === file ? "opacity-50" : "opacity-100"
								}`}
								onMouseEnter={() => {
									document.getElementById(`minus-${file}`)?.classList.remove("hidden");
								}}
								onMouseLeave={() => {
									document.getElementById(`minus-${file}`)?.classList.add("hidden");
								}}
							>
								<span className="ml-8" onClick={() => props.setCurrentFile(file)}>
									{file}
								</span>
								<FaMinus
									id={`minus-${file}`}
									className={`mr-5 hidden mt-1`}
									onClick={() => props.removeFile(file, props.items.name)}
								/>
							</div>
						))}
						{addNewFile && (
							<div className="p-1">
								<input
									type="text"
									placeholder="  File Name"
									className="px-2 w-full rounded-md outline-dotted bg-slate-200"
									onKeyUp={getFileName}
								/>
							</div>
						)}
					</div>
				) : (
					<div className={`text-center`}>No Files</div>
				)
			)}
		</div>
	);
}

function EditorSideBar(props) {
	const [width, setWidth] = React.useState(window.innerWidth);
	const [filesInOrder, setFilesInOrder] = React.useState({
		"123/MyModule/": [
            
		],
	});

	React.useEffect(() => {
		function handleResize(e) {
			setWidth(e.target.innerWidth);
		}
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	function removeFile(fileName, folderName) {
		setFilesInOrder((prev) => {
			const updatedFiles = prev[folderName].filter(
				(filePath) => !filePath.endsWith(`/${fileName}`)
			);
			return {
				...prev,
				[folderName]: updatedFiles,
			};
		});
	}

	return (
		<div
			style={{ width: width * 0.1 }}
			className={`h-screen border-2 rounded-xl bg-white`}
		>
			<div className="flex flex-col text-black">
				{Object.keys(filesInOrder).map((folder) => (
					<Folder
						key={folder}
						mode="light"
						items={{ name: folder, files: filesInOrder[folder] }}
						width={width * 0.1}
						setFilesInOrder={setFilesInOrder}
						setCurrentFile={props.setCurrentFile}
						removeFile={removeFile}
						currentFile={props.currentFile}
					/>
				))}
			</div>
		</div>
	);
}

export { EditorSideBar };
