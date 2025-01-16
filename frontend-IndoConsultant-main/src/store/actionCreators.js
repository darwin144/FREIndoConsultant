
export const BASE_URL = 'http://213.210.21.23:3000';
//export const BASE_URL = 'http://localhost:3000';


export const loginUser = (DB_USER, DB_PASS) => {
    return async dispatch => {
        try {
            const payload = {
                email: DB_USER,
                password: DB_PASS,
            };
            console.log('Request Payload:', payload);

            const response = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response from server:', errorData);
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();

            // Store access_token correctly
            localStorage.setItem('access_token', data.access_token);

            dispatch({
                type: 'user/login',
                payload: {
                    email: DB_USER,
                    access_token: data.access_token,
                },
            });
        } catch (error) {
            console.error('Error occurred during login:', error);
            throw error;
        }
    };
};


export const fetchPortfolios = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/portfolios`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'portfolios/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchOutput = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/outputs`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'output/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchRuangLingkup = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/ruanglingkups`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'ruangLingkup/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchCarousels = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/carousels`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'carousels/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}

export const fetchNews = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/news`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'news/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
};

export const createNews = (newsItem) => {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append('judul', newsItem.judul);
            formData.append('isi', newsItem.isi);
            formData.append('gambar', newsItem.link_gambar);

            const response = await fetch(`${BASE_URL}/news`, {
                method: 'POST',
                body: formData,
                headers: {
                    "access_token": localStorage.getItem('access_token')
                },
            });

            if (!response.ok) {
                throw new Error('Failed to add News');
            }

            await response.json();
            dispatch(fetchNews()); // Refresh the event list
        } catch (error) {
            console.error('Error adding News:', error);
        }
    };
};

export const createPortfolio = (portfolioData, file) => async (dispatch) => {
    console.log(portfolioData, 'isi nya porto');

    try {
        const formData = new FormData();
        formData.append('judul', portfolioData.judul);
        formData.append('isi', portfolioData.isi);
        formData.append('lingkupPekerjaan', portfolioData.lingkupPekerjaan);
        formData.append('divisi', portfolioData.divisi);

        if (file) {
            formData.append('gambar', file);
        }

        const response = await fetch(`${BASE_URL}/portfolios`, {
            method: 'POST',
            body: formData,
            headers: {
                "access_token": localStorage.getItem('access_token')
            },
        });

        const newPortfolio = await response.json();

        if (response.ok) {
            dispatch({ type: 'portfolios/create', payload: newPortfolio });

            // Panggil action creator untuk menyimpan ruangLingkupIsi dan outputIsi
            if (portfolioData.ruangLingkupIsi.length > 0) {
                dispatch(createRuangLingkup(newPortfolio.id, portfolioData.ruangLingkupIsi));
            }
            if (portfolioData.outputIsi.length > 0) {
                dispatch(createOutput(newPortfolio.id, portfolioData.outputIsi));
            }
        } else {
            dispatch({ type: 'CREATE_PORTFOLIO_ERROR', payload: newPortfolio.error });
        }
    } catch (error) {
        dispatch({ type: 'CREATE_PORTFOLIO_ERROR', payload: error.message });
    }
};


export const createRuangLingkup = (PortfolioId, ruangLingkupIsi) => async (dispatch) => {
    try {
        const response = await fetch(`${BASE_URL}/ruanglingkups`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "access_token": localStorage.getItem('access_token')
            },
            // Ganti ruangLingkupIsi menjadi isi
            body: JSON.stringify({ PortfolioId, isi: ruangLingkupIsi })
        });

        const newRuangLingkup = await response.json();

        if (response.ok) {
            dispatch({ type: 'ruangLingkup/create', payload: newRuangLingkup });
        } else {
            dispatch({ type: 'CREATE_RUANGLINGKUP_ERROR', payload: newRuangLingkup.error });
        }
    } catch (error) {
        dispatch({ type: 'CREATE_RUANGLINGKUP_ERROR', payload: error.message });
    }
};



// export const createOutput = (outputIsi) => async (dispatch) => {
//     try {
//         const response = await fetch(`${BASE_URL}/outputs`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 "access_token": localStorage.getItem('access_token')
//             },
//             body: JSON.stringify({ outputIsi })
//         });

//         const newOutput = await response.json();

//         if (response.ok) {
//             dispatch({ type: 'output/create', payload: newOutput });
//         } else {
//             dispatch({ type: 'CREATE_OUTPUT_ERROR', payload: newOutput.error });
//         }
//     } catch (error) {
//         dispatch({ type: 'CREATE_OUTPUT_ERROR', payload: error.message });
//     }
// };


// export const createPortfolio = (portfolioData, file) => async (dispatch) => {
//     console.log(portfolioData, 'isi nya porto');

//     try {
//         const formData = new FormData();
//         formData.append('judul', portfolioData.judul);
//         formData.append('isi', portfolioData.isi);
//         formData.append('lingkupPekerjaan', portfolioData.lingkupPekerjaan);
//         formData.append('divisi', portfolioData.divisi);

//         if (file) {
//             formData.append('gambar', file);
//         }

//         const response = await fetch(`${BASE_URL}/portfolios`, {
//             method: 'POST',
//             body: formData,
//             headers: {
//                 "access_token": localStorage.getItem('access_token')
//             },
//         });

//         const newPortfolio = await response.json();

//         if (response.ok) {
//             dispatch({ type: 'portfolios/create', payload: newPortfolio });

//             // Panggil action creator untuk menyimpan ruangLingkupIsi dan outputIsi
//             if (portfolioData.ruangLingkupIsi.length > 0) {
//                 dispatch(createRuangLingkup(portfolioData.ruangLingkupIsi));
//             }
//             if (portfolioData.outputIsi.length > 0) {
//                 // Mengirimkan PortfolioId yang baru dibuat bersama outputIsi ke createOutput
//                 dispatch(createOutput(newPortfolio.id, portfolioData.outputIsi));
//             }
//         } else {
//             dispatch({ type: 'CREATE_PORTFOLIO_ERROR', payload: newPortfolio.error });
//         }
//     } catch (error) {
//         dispatch({ type: 'CREATE_PORTFOLIO_ERROR', payload: error.message });
//     }
// };

export const createOutput = (PortfolioId, outputIsi) => async (dispatch) => { 
    try {
        const response = await fetch(`${BASE_URL}/outputs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "access_token": localStorage.getItem('access_token')
            },
            body: JSON.stringify({ PortfolioId, outputIsi })
        });

        const newOutputs = await response.json();

        if (response.ok) {
            dispatch({ type: 'output/create', payload: newOutputs });
        } else {
            dispatch({ type: 'CREATE_OUTPUT_ERROR', payload: newOutputs.error });
        }
    } catch (error) {
        dispatch({ type: 'CREATE_OUTPUT_ERROR', payload: error.message });
    }
};


export const createCarousel = (PortfolioId, file) => async (dispatch) => {
    try {
        const formData = new FormData();
        formData.append('PortfolioId', PortfolioId);

        if (file) {
            formData.append('gambar', file);
        }

        const response = await fetch(`${BASE_URL}/carousels`, {
            method: 'POST',
            body: formData,
            headers: {
                "access_token": localStorage.getItem('access_token')
            },
        });

        const newCarousel = await response.json();

        if (response.ok) {
            dispatch({ type: 'carousels/create', payload: newCarousel });
        } else {
            dispatch({ type: 'CREATE_CAROUSEL_ERROR', payload: newCarousel.error });
        }
    } catch (error) {
        dispatch({ type: 'CREATE_CAROUSEL_ERROR', payload: error.message });
    }
};


export const createPortfolioWithDetails = (portfolioData, file) => async (dispatch) => {
    try {
        const formData = new FormData();
        formData.append('judul', portfolioData.judul);
        formData.append('isi', portfolioData.isi);
        formData.append('lingkupPekerjaan', portfolioData.lingkupPekerjaan);
        formData.append('divisi', portfolioData.divisi);
        if (file) {
            formData.append('gambar', file);
        }

        // Append ruangLingkupIsi dan outputIsi sebagai JSON string
        formData.append('ruangLingkupIsi', JSON.stringify(portfolioData.ruangLingkupIsi));
        formData.append('outputIsi', JSON.stringify(portfolioData.outputIsi));

        const response = await fetch(`${BASE_URL}/portfoliosWithDetails`, {
            method: 'POST',
            body: formData,
            headers: {
                "access_token": localStorage.getItem('access_token')
            },
        });

        const responseData = await response.json();

        if (response.ok) {
            dispatch({ type: 'portfolios/create', payload: responseData.portfolio });
            dispatch({ type: 'output/set', payload: responseData.output });
            dispatch({ type: 'ruanglingkup/set', payload: responseData.ruanglingkup });
        } else {
            dispatch({ type: 'CREATE_PORTFOLIO_ERROR', payload: responseData.error });
        }
    } catch (error) {
        dispatch({ type: 'CREATE_PORTFOLIO_ERROR', payload: error.message });
    }
};


export const updateNews = (newsItem, newsId) => {
    console.log(newsItem, 'di action');

    return async (dispatch) => {
        dispatch({ type: 'UPDATE_NEWS_LOADING' }); // Dispatch loading action
        try {
            const formData = new FormData();
            formData.append('judul', newsItem.judul);
            formData.append('isi', newsItem.isi);
            if (newsItem.link_gambar) {
                formData.append('gambar', newsItem.link_gambar); // Correct key to match your backend
            }

            const response = await fetch(`${BASE_URL}/news/${newsId}`, {
                method: 'PUT',
                body: formData,
                headers: {
                    "access_token": localStorage.getItem('access_token') || ''
                },
            });

            if (!response.ok) {
                const errorData = await response.json(); // Fetch error details
                throw new Error(`Failed to update News: ${errorData.message}`);
            }

            const updatedNews = await response.json();
            dispatch({ type: 'news/update', payload: updatedNews }); // Dispatch successful update
            dispatch(fetchNews()); // Refresh the news list
            return updatedNews; // Optionally return the updated news item
        } catch (error) {
            console.error('Error updating News:', error);
            dispatch({ type: 'UPDATE_NEWS_ERROR', payload: error.message }); // Handle error
        } finally {
            dispatch({ type: 'UPDATE_NEWS_LOADING_COMPLETE' }); // Dispatch loading complete action
        }
    };
};





export const deleteNews = (id) => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/news/${id}`, {
                method: "DELETE",
                headers: {
                    "access_token": localStorage.getItem('access_token')
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete news');
            }

            dispatch({ type: 'news/delete', payload: id });
        } catch (error) {
            console.log(error.message);
        }
    };
};

export const deletePortfolio = (id) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${BASE_URL}/portfolios/${id}`, {
                method: "DELETE",
                headers: {
                    "access_token": localStorage.getItem('access_token')
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete portfolio');
            }

            dispatch({ type: 'portfolios/delete', payload: id });
        } catch (error) {
            console.log(error.message);
        }
    };
};



export const fetchUsers = () => {
    return async dispatch => {
        try {
            const response = await fetch(`${BASE_URL}/membertrx`, {
                method: "GET",
                headers: {
                    "access_token": localStorage.getItem('access_token')
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            dispatch({ type: 'users/get', payload: data });
        } catch (error) {
            console.log(error.message);
        }
    };
}