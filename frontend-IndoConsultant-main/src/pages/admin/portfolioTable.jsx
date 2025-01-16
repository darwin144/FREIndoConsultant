import { BASE_URL, createCarousel, createNews, createPortfolio, deleteNews, deletePortfolio, fetchCarousels, fetchNews, fetchOutput, fetchPortfolios, fetchRuangLingkup, updateNews } from '@/store/actionCreators';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';

export const PortfolioTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const portfolios = useSelector((state) => state.portfolios.portfolios);
    const filterport = portfolios.filter((p) => p.divisi === "Main Portfolio");
    const otherport = portfolios.filter((p) => p.divisi === "Others Portfolio");
    const ruangLingkup = useSelector((state) => state.ruangLingkup.ruangLingkup);
    const output = useSelector((state) => state.output.output);
    const carousels = useSelector((state) => state.carousels.carousels);
    const [selectedProject, setSelectedProject] = useState(filterport[0]);




    const news = useSelector((state) => state.news.news);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenCarousel, setModalOpenCarousel] = useState(false);
    const toggleModal = () => setModalOpen(!modalOpen);
    const toggleModalCarousel = () => setModalOpenCarousel(!modalOpenCarousel);
    const [modalOpenUpdate, setModalOpenUpdate] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [activeButton, setActiveButton] = useState("Portfolio");
    const [file, setFile] = useState(null);
    const [fileCarousel, setFileCarousel] = useState(null);
    const [portfolioIdCarousel, setPortfolioIdCarousel] = useState(null);

    const handleFileChangeCarousel = (event) => {
        setFileCarousel(event.target.files[0]);
    };

    const handleChangeId = (event) => {
        setPortfolioIdCarousel(event.target.value);
    };

    const handleSubmitCarousel = async (event) => {
        event.preventDefault();
    
        if (portfolioIdCarousel && fileCarousel) {
            dispatch(createCarousel(portfolioIdCarousel, fileCarousel));
    
            Swal.fire({
                title: 'Success!',
                text: 'Carousel has been added successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
    
            toggleModalCarousel(); // Menutup modal setelah pengiriman
        } else {
            Swal.fire({
                title: 'Incomplete Information',
                text: 'Please select a title and upload a picture.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }
    };

    const [portfolioData, setPortfolioData] = useState({
        judul: '',
        isi: '',
        lingkupPekerjaan: null,
        divisi: '',
        ruangLingkupIsi: [], // Array untuk menyimpan beberapa ruang lingkup
        outputIsi: []
    });

    const addRuangLingkup = () => setPortfolioData({ ...portfolioData, ruangLingkupIsi: [...portfolioData.ruangLingkupIsi, ""] });
    const removeRuangLingkup = (index) => setPortfolioData({ ...portfolioData, ruangLingkupIsi: portfolioData.ruangLingkupIsi.filter((_, i) => i !== index) });
    const handleRuangLingkupChange = (index, value) => {
        const updatedLingkup = [...portfolioData.ruangLingkupIsi];
        updatedLingkup[index] = value;
        setPortfolioData({ ...portfolioData, ruangLingkupIsi: updatedLingkup });
    };

    const addOutput = () => setPortfolioData({ ...portfolioData, outputIsi: [...portfolioData.outputIsi, ""] });
    const removeOutput = (index) => setPortfolioData({ ...portfolioData, outputIsi: portfolioData.outputIsi.filter((_, i) => i !== index) });
    const handleOutputChange = (index, value) => {
        const updatedOutput = [...portfolioData.outputIsi];
        updatedOutput[index] = value;
        setPortfolioData({ ...portfolioData, outputIsi: updatedOutput });
    };


    const handleNavigation = (buttonName, path) => {
        setActiveButton(buttonName);
        navigate(path);
    };

    const toggleModalUpdate = (item) => {
        setModalOpenUpdate(!modalOpenUpdate);
        setNewsItem(item);
        console.log(item, 'muncul');

        setImagePreviewUrl(item.gambar); // Ambil URL gambar dari item yang dipilih
    };



    const [newsItem, setNewsItem] = useState({
        judul: '',
        isi: '',
        link_gambar: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPortfolioData({
            ...portfolioData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const filteredData = Object.fromEntries(
        Object.entries(portfolioData).map(([key, value]) => [key, value || (value === null ? null : "")])
    );
    const handleSubmit = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to submit this portfolio item?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, submit it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(createPortfolio(filteredData, file));
                toggleModal();
                Swal.fire(
                    'Submitted!',
                    'Your item has been submitted.',
                    'success'
                );
            }
        });
        toggleModal();
    };


    const handleChangeUpdate = (e) => {
        const { name, value } = e.target;
        setNewsItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();

        // Menampilkan dialog konfirmasi sebelum melakukan pembaruan
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to update this news item?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        });

        if (result.isConfirmed) {
            const formData = new FormData();
            formData.append('judul', newsItem.judul);
            formData.append('isi', newsItem.isi);
            if (newsItem.link_gambar) {
                formData.append('gambar', newsItem.link_gambar); // Append only if there is a new image file
            }

            try {
                const response = await fetch(`${BASE_URL}/news/${newsItem.id}`, {
                    method: 'PUT',
                    body: formData,
                    headers: {
                        "access_token": localStorage.getItem('access_token') || ''
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Failed to update News: ${errorData.message}`);
                }

                const updatedNews = await response.json();
                Swal.fire('Updated!', 'News updated successfully!', 'success'); // Tampilkan pesan sukses
                dispatch(fetchNews()); // Refresh the news list to reflect the changes
            } catch (error) {
                console.error("Error updating News:", error);
                Swal.fire('Error!', 'Error updating news, please try again.', 'error'); // Tampilkan pesan error
            }
            toggleModalUpdate()
        }
    };


    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deletePortfolio(id));
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
            }
        });
    };



    useEffect(() => {
        dispatch(fetchPortfolios());
        dispatch(fetchNews());
        dispatch(fetchRuangLingkup());
        dispatch(fetchOutput());
        dispatch(fetchCarousels());
    }, [dispatch]);

    // console.log(ruangLingkup, 'iniii dia');


    return (
        <div className="flex justify-center items-center space-x-10 overflow-hidden mt-16 mb-24">
            <div className="container container2">
                <div className="row justify-content-center">
                    <div className="w-full flex mb-8 flex-col items-center">
                        <div className="flex space-x-4 border border-gray-400 rounded-full bg-gray-100/90 backdrop-blur-md shadow-md p-1 md:w-[20rem] w-10/12">
                            <button
                                className={`h-10 w-24 md:w-auto px-4 py-2 rounded-full font-semibold transition-colors duration-200 text-xs md:text-base ${activeButton === "Home" ? "bg-gray-300 text-gray-800" : "text-gray-600 hover:bg-gray-300"}`}
                                onClick={() => handleNavigation("Home", "/")}
                            >
                                Home
                            </button>
                            <button
                                className={`h-10 w-24 md:w-auto px-4 py-2 rounded-full font-semibold transition-colors duration-200 text-xs md:text-base ${activeButton === "News" ? "bg-gray-300 text-gray-800" : "text-gray-600 hover:bg-gray-300"}`}
                                onClick={() => handleNavigation("News", "/newsTable")}
                            >
                                News
                            </button>
                            <button
                                className={`h-10 w-24 md:w-auto px-4 py-2 rounded-full font-semibold transition-colors duration-200 text-xs md:text-base ${activeButton === "Portfolio" ? "bg-gray-300 text-gray-800" : "text-gray-600 hover:bg-gray-300"}`}
                                onClick={() => handleNavigation("Portfolio", "/portfolioTable")}
                            >
                                Portfolio
                            </button>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:ring-green-400 font-semibold rounded-full text-sm px-6 py-3 me-2 mb-2 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-700"
                        onClick={toggleModal}
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-600 focus:ring-4 focus:ring-green-400 font-semibold rounded-full text-sm px-6 py-3 me-2 mb-2 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-700"
                        onClick={toggleModalCarousel}
                    >
                        Add Carousel
                    </button>
                    {modalOpenCarousel && (
                        <div id="crud-modal" className="rounded-2xl fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-md bg-opacity-40 bg-gray-300">
                            <div className="rounded-2xl relative p-4 w-full max-w-md max-h-full mx-auto my-32 overflow-y-auto">
                                <div className="rounded-2xl relative bg-white shadow dark:bg-gray-700">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Carousel</h3>
                                        <button
                                            type="button"
                                            onClick={toggleModalCarousel}
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <form className="p-4 md:p-5" onSubmit={handleSubmitCarousel}>
                                        <div className="grid gap-4 mb-4 grid-cols-2">
                                            <div className="col-span-2 sm:col-span-1">
                                                <label htmlFor="link_gambar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Picture</label>
                                                <input
                                                    type="file"
                                                    name="link_gambar"
                                                    id="link_gambar"
                                                    onChange={handleFileChangeCarousel}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-2 sm:col-span-1">
                                                <label htmlFor="divisi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Judul</label>
                                                <select
                                                    id="portfilter"
                                                    name="portfilter"
                                                    value={portfolioIdCarousel}
                                                    onChange={handleChangeId}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                >
                                                    <option value="">Pilih Judul</option>
                                                    {filterport.map((portfilter) => (
                                                        <option key={portfilter.id} value={portfilter.id}>
                                                            {portfilter.judul}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="text-white inline-flex items-center justify-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm w-full px-8 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        >
                                            Add
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                    {modalOpen && (
                        <div id="crud-modal" className="rounded-2xl fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-md bg-opacity-40 bg-gray-300">
                            <div className="rounded-2xl relative p-4 w-full max-w-md max-h-full mx-auto my-32 overflow-y-auto">
                                <div className="rounded-2xl relative bg-white shadow dark:bg-gray-700">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Portfolio</h3>
                                        <button
                                            type="button"
                                            onClick={toggleModal}
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                                        <div className="grid gap-4 mb-4 grid-cols-2">
                                            {/* Judul */}
                                            <div className="col-span-2 sm:col-span-1">
                                                <label htmlFor="judul" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                                <input
                                                    type="text"
                                                    name="judul"
                                                    id="judul"
                                                    value={portfolioData.judul}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Type title"
                                                    required
                                                />
                                            </div>

                                            {/* Isi */}
                                            <div className="col-span-2 sm:col-span-1">
                                                <label htmlFor="isi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                                                <textarea
                                                    name="isi"
                                                    id="isi"
                                                    value={portfolioData.isi}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Type description"
                                                    required
                                                />
                                            </div>

                                            {/* Divisi */}
                                            <div className="col-span-2 sm:col-span-1">
                                                <label htmlFor="divisi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Divisi</label>
                                                <select
                                                    id="divisi"
                                                    name="divisi"
                                                    value={portfolioData.divisi}
                                                    onChange={handleChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                >
                                                    <option value="">Pilih Divisi</option>
                                                    <option value="Main Portfolio">Main Portfolio</option>
                                                    <option value="Others Portfolio">Others Portfolio</option>
                                                </select>
                                            </div>

                                            {/* Picture */}
                                            {portfolioData.divisi !== "Others Portfolio" && (
                                                <div className="col-span-2 sm:col-span-1">
                                                    <label htmlFor="link_gambar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Picture</label>
                                                    <input
                                                        type="file"
                                                        name="link_gambar"
                                                        id="link_gambar"
                                                        onChange={handleFileChange}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                        required
                                                    />
                                                </div>
                                            )}

                                            {/* Ruang Lingkup Isi */}
                                            <div className="col-span-2">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ruang Lingkup</label>
                                                {portfolioData.ruangLingkupIsi.map((isi, index) => (
                                                    <div key={index} className="flex items-center mb-2">
                                                        <input
                                                            type="text"
                                                            value={isi}
                                                            onChange={(e) => handleRuangLingkupChange(index, e.target.value)}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mr-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                            placeholder={`Lingkup ${index + 1}`}
                                                            required
                                                        />
                                                        <button type="button" onClick={() => removeRuangLingkup(index)} className="text-red-600">
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                                <button type="button" onClick={addRuangLingkup} className="text-green-600">
                                                    Add Lingkup
                                                </button>
                                            </div>

                                            {/* Output Isi */}
                                            <div className="col-span-2">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Output</label>
                                                {portfolioData.outputIsi.map((isi, index) => (
                                                    <div key={index} className="flex items-center mb-2">
                                                        <input
                                                            type="text"
                                                            value={isi}
                                                            onChange={(e) => handleOutputChange(index, e.target.value)}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mr-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                            placeholder={`Output ${index + 1}`}
                                                            required
                                                        />
                                                        <button type="button" onClick={() => removeOutput(index)} className="text-red-600">
                                                            Remove
                                                        </button>
                                                    </div>
                                                ))}
                                                <button type="button" onClick={addOutput} className="text-green-600">
                                                    Add Output
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="text-white inline-flex items-center justify-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm w-full px-8 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        >
                                            Add
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                    {modalOpenUpdate && (
                        <div id="crud-modal" className="rounded-2xl fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-md bg-opacity-40 bg-gray-300">
                            <div className="rounded-2xl relative p-4 w-full max-w-md max-h-full mx-auto my-32 overflow-y-auto">
                                <div className="rounded-2xl relative bg-white shadow dark:bg-gray-700">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Update News</h3>
                                        <button
                                            type="button"
                                            onClick={toggleModalUpdate}
                                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    <form className="p-4 md:p-5" onSubmit={handleSubmitUpdate}>
                                        <div className="grid gap-4 mb-4 grid-cols-2">
                                            <div className="col-span-2 sm:col-span-1">
                                                <label htmlFor="judul" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                                <input
                                                    type="text"
                                                    name="judul"
                                                    id="judul"
                                                    value={newsItem.judul}
                                                    onChange={handleChangeUpdate}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Type title"
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-2 sm:col-span-1">
                                                <label htmlFor="isi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                                                <textarea
                                                    name="isi"
                                                    id="isi"
                                                    value={newsItem.isi}
                                                    onChange={handleChangeUpdate}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Type description"
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-2 sm:col-span-1">
                                                <label htmlFor="link_gambar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Picture</label>
                                                {/* <img
                                                    src={ BASE_URL + newsItem.gambar}
                                                    alt="Preview"
                                                    className="h-2 mb-2"
                                                /> */}

                                                <input
                                                    type="file"
                                                    name="link_gambar"
                                                    id="link_gambar"
                                                    onChange={handleFileChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                />
                                                <p className="text-sm text-gray-500">Current image will be replaced if a new one is chosen.</p>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="text-white inline-flex items-center justify-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm w-full px-8 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        >
                                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
                                            Update
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none mb-4">
                        Main Portfolio
                    </h2>
                    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-2xl">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-4">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 w-[10%]">Judul</th>
                                    <th scope="col" className="px-6 py-3 w-[20%]">Isi</th>
                                    <th scope="col" className="px-6 py-3 w-[10%]">Gambar</th>
                                    <th scope="col" className="px-6 py-3 w-[10%]">Ruang Lingkup</th>
                                    <th scope="col" className="px-6 py-3 w-[20%]" style={{ width: '20%' }}>Output</th>
                                    <th scope="col" className="px-6 py-3 w-[10%]">Carousels</th>
                                    <th scope="col" className="px-6 py-1 w-[5%]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterport.map((item) => {
                                    const ruangLingkupIsi = ruangLingkup.filter(
                                        (r) => r.PortfolioId === item?.id
                                    );
                                    const filteredCarousels = carousels.filter(
                                        (f) => f.PortfolioId === item?.id
                                    );
                                    const filteredOutput = output.filter(
                                        (o) => o.PortfolioId === item?.id
                                    );

                                    return (
                                        <tr
                                            key={item.id}
                                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {item.judul}
                                            </th>
                                            <td className="px-6 py-4">{item.isi}</td>
                                            <td className="px-6 py-4">
                                                <img
                                                    src={BASE_URL + item.gambar}
                                                    alt={item.judul}
                                                    className="w-24 h-24 object-cover rounded" // Increased image size for better display
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                {item?.lingkupPekerjaan && item?.lingkupPekerjaan !== 'null' ? (
                                                    <li>{item.lingkupPekerjaan}</li>
                                                ) : (
                                                    ruangLingkupIsi.map((r, index) => (
                                                        <li key={index}>{r.isi}</li>
                                                    ))
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {filteredOutput.map((o, index) => (
                                                    <li key={index}>{o.isi}</li>
                                                ))}
                                            </td>
                                            <td className="px-6 py-4">
                                                {filteredCarousels.map((o, index) => (
                                                    <li key={index}>   <img
                                                        src={BASE_URL + o.gambar}
                                                        alt={o.judul}
                                                        className="w-24 h-24 object-cover rounded" // Increased image size for better display
                                                    />
                                                    </li>
                                                ))}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    type="button"
                                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:ring-red-400 font-semibold rounded-full text-sm px-6 py-3 me-2 mb-2 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-700"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none mb-4 mt-4">
                        Others Portfolio
                    </h2>
                    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-2xl">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-4">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3 w-1/5">Judul</th>
                                    <th scope="col" className="px-6 py-3 w-1/5">Isi</th>
                                    <th scope="col" className="px-6 py-3 w-1/5">Ruang Lingkup</th>
                                    <th scope="col" className="px-6 py-3 w-1/5">Output</th>
                                    <th scope="col" className="px-6 py-3 w-1/5">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {otherport.map((item) => {
                                    const ruangLingkupIsi = ruangLingkup.filter(
                                        (r) => r.PortfolioId === item?.id
                                    );
                                    const filteredOutput = output.filter(
                                        (o) => o.PortfolioId === item?.id
                                    );

                                    return (
                                        <tr
                                            key={item.id}
                                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                        >
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {item.judul}
                                            </th>
                                            <td className="px-6 py-4">{item.isi}</td>

                                            <td className="px-6 py-4">
                                                {item?.lingkupPekerjaan && item?.lingkupPekerjaan !== 'null' ? (
                                                    <li>{item.lingkupPekerjaan}</li>
                                                ) : (
                                                    ruangLingkupIsi.map((r, index) => (
                                                        <li key={index}>{r.isi}</li>
                                                    ))
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {filteredOutput.map((o, index) => (
                                                    <li key={index}>{o.isi}</li>
                                                ))}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    type="button"
                                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-600 focus:ring-4 focus:ring-red-400 font-semibold rounded-full text-sm px-6 py-3 me-2 mb-2 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-700"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};