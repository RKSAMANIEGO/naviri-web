import { useEffect, useState } from "react";
import TableFAQ from "react-data-table-component";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import styles from "./TableQuestions.module.css";
import ModalQuestions from "../ModalQuestions/ModalQuestions";
import { listQuestions, deleteQuestions } from "../../services/questionService";
import Swal from "sweetalert2";

const TableQuestions = ({ confirmaddQuestion, textSearch }) => {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [dataQuestions, setDataQuestions] = useState(null);
	const [updateDataTable, setUpdateDataTable] = useState(false);

	console.log(textSearch);

	// FILTRAR
	useEffect(() => {
		if (dataQuestions && textSearch) {
			const responseFilter = dataQuestions.filter((obj) =>
				obj.question.toLowerCase().includes(textSearch.toLowerCase())
			);
			responseFilter.length > 0 && setDataQuestions(responseFilter);
		} else if (dataQuestions && textSearch === "") {
			lsquestions();
		}
	}, [textSearch]);

	// CONSUMIR LA LISTA DE PREGUNTAS
	const lsquestions = async () => {
		const response = await listQuestions();
		if (response) {
			console.log(response.data.data);
			setDataQuestions(response.data.data);
		}
	};

	useEffect(() => {
		lsquestions();
	}, [updateDataTable, confirmaddQuestion]);

	const styleTableQuestions = {

		headCells: {
			style: {
				fontSize: "12px",
				fontWeight: "bold",
				color: "rgba(255, 107, 188, 1)",
				backgroundColor: "rgba(255, 241, 249, 1)",
				padding: "5px 15px",
			},
		},
		cells: {
			style: {
				fontSize: "10px",
				fontWeight: "500",
				padding: "5px 15px",
				textTransform: "capitalize",
			},
		},
	};

	const colums = [
		{
			name: "Preguntas",
			selector: (row) => row.question,
			width: "40%",
		},
		{
			name: "Respuestas",
			selector: (row) => <div className="truncate w-full"> {row.answer}</div>,
			width: "40%",
		},
		{
			name: "Opciones",
			cell: (row) => (
				<div className={styles.wrapperOptions}>
					<EditOutlined
						className={styles.EditOption}
						onClick={() => {
							localStorage.setItem("idQuestions", row.id);
							setIsOpenModal(true);
						}}
					/>
					<DeleteOutlined
						className={styles.DeleteOption}
						onClick={() => {
							Swal.fire({
								title: "¿Estas seguro de eliminar esta pregunta?",
								text: "No podras revertir este cambio",
								icon: "warning",
								showCancelButton: true,
								confirmButtonColor: "rgb(228, 34, 170)",
								cancelButtonColor: "rgb(38, 86, 218)",
								confirmButtonText: "Si, eliminar!",
							}).then(async (result) => {
								if (result.isConfirmed) {
									const response = await deleteQuestions(row.id);
									if (response.status === 200) {
										Swal.fire(
											"Eliminado!",
											`La pregunta ha sido eliminada Correctamente.`,
											"success"
										);
										setUpdateDataTable(!updateDataTable);
									} else {
										Swal.fire(
											"Ocurrio un Error al Eliminar la Pregunta",
											`Intentelo Nuevamente`,
											"warning"
										);
									}
								}
							});
						}}
					/>
				</div>
			),
			width: "20%",
		},
	];

	const updateListQuestions = (confirm) =>
		confirm === updateDataTable
			? setUpdateDataTable(!confirm)
			: setUpdateDataTable(confirm);

	return (
		<>
			<TableFAQ
				columns={colums}
				data={dataQuestions ? dataQuestions : []}
				customStyles={styleTableQuestions}
				highlightOnHover
				pointerOnHover
				paginationPerPage={5}
				paginationRowsPerPageOptions={[5]}
				pagination
			/>

			<ModalQuestions
				isOpen={isOpenModal}
				onClosed={() => setIsOpenModal(false)}
				titleModal="updateQuestion"
				putConfirm={updateListQuestions}
			/>
		</>
	);
};

export default TableQuestions;
