import { BASE_URL, createNews, deleteNews, fetchNews, updateNews } from '@/store/actionCreators';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';

export const NewsTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const news = useSelector((state) => state.news.news);
    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => setModalOpen(!modalOpen);
    const [modalOpenUpdate, setModalOpenUpdate] = useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [activeButton, setActiveButton] = useState("News");
    const [updatedNewsItem, setUpdatedNewsItem] = useState({
        judul: '',
        isi: '',
        link_gambar: null,
    });

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
        const { name, value, files } = e.target;
        if (name === 'link_gambar') {
            setNewsItem({ ...newsItem, link_gambar: files[0] });
        } else {
            setNewsItem({ ...newsItem, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to submit this news item?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, submit it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(createNews(newsItem));
                toggleModal();
                Swal.fire(
                    'Submitted!',
                    'Your news item has been submitted.',
                    'success'
                );
            }
        });
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewsItem((prev) => ({ ...prev, link_gambar: file })); // Store the file
            const previewUrl = URL.createObjectURL(file); // Create a URL for preview
            setImagePreviewUrl(previewUrl); // Set the preview URL
        }
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
                dispatch(deleteNews(id));
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
            }
        });
    };



    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);

    console.log(imagePreviewUrl, 'awa;');

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
                    {modalOpen && (
                        <div id="crud-modal" className="rounded-2xl fixed inset-0 z-50 flex items-center justify-center backdrop-filter backdrop-blur-md bg-opacity-40 bg-gray-300">
                            <div className="rounded-2xl relative p-4 w-full max-w-md max-h-full mx-auto my-32 overflow-y-auto">
                                <div className="rounded-2xl relative bg-white shadow dark:bg-gray-700">
                                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add News</h3>
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
                                            <div className="col-span-2 sm:col-span-1">
                                                <label htmlFor="judul" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                                <input
                                                    type="text"
                                                    name="judul"
                                                    id="judul"
                                                    value={newsItem.judul}
                                                    onChange={handleChange}
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
                                                    onChange={handleChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    placeholder="Type description"
                                                    required
                                                />
                                            </div>
                                            <div className="col-span-2 sm:col-span-1">
                                                <label htmlFor="link_gambar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Picture</label>
                                                <input
                                                    type="file"
                                                    name="link_gambar"
                                                    id="link_gambar"
                                                    onChange={handleChange}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="text-white inline-flex items-center justify-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm w-full px-8 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        >
                                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                            </svg>
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

                    <div className="relative overflow-x-auto shadow-md sm:rounded-2xl">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Title</th>
                                    <th scope="col" className="px-6 py-3">Content</th>
                                    <th scope="col" className="px-6 py-3">Image</th>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                    <th scope="col" className="px-6 py-3">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {news.map((news) => (
                                    <tr
                                        key={news.id}
                                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {news.judul}
                                        </th>
                                        <td className="px-6 py-4">{news.isi}</td>
                                        <td className="px-6 py-4">
                                            <img src={BASE_URL + news.gambar} alt={news.judul} className="w-12 h-12 object-cover rounded" />
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(news.createdAt).toLocaleDateString('en-GB')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                type="button"
                                                className="text-gray-900 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-4 focus:ring-green-100 font-semibold rounded-full text-sm px-5 py-2.5 me-2 mb-2 transition-all duration-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800 dark:focus:ring-green-700"
                                                onClick={() => toggleModalUpdate(news)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="text-gray-900 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-4 focus:ring-red-100 font-semibold rounded-full text-sm px-5 py-2.5 me-2 mb-2 transition-all duration-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800 dark:focus:ring-red-700"
                                                onClick={() => handleDelete(news.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};