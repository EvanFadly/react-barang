import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Api from "../../api";

export default function PostsCreate() {
    const [namaBarang, setNamaBarang] = useState("");
    const [berat, setBerat] = useState("");
    const [image, setImage] = useState("");

    const [error, setError] = useState({});

    const navigate = useNavigate();

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            console.log("Select File", file); //debugging
            setImage(file);
        }
    };

    const storePost = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nama_barang", namaBarang);
        formData.append("berat", berat);
        formData.append("foto", image);

        await Api.post("/barangs", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                navigate("/barangs");
            })
            .catch((error) => {
                setError(error.response.data.errors || {});
            });
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card border-0 rounded shadow-lg">
                        <div className="card-body">
                            <h4 className="text-center mb-4 font-weight-bold">Tambah Barang Baru</h4>
                            <form onSubmit={storePost}>

                                {/* Nama Barang */}
                                <div className="mb-4">
                                    <label className="form-label text-muted">Nama Barang</label>
                                    <input
                                        type="text"
                                        className="form-control py-3 border-2 border-gray-300 rounded-md"
                                        value={namaBarang}
                                        onChange={(e) => setNamaBarang(e.target.value)}
                                    />
                                    {error.nama_barang && (
                                        <div className="alert alert-danger mt-2">
                                            {error.nama_barang}
                                        </div>
                                    )}
                                </div>

                                {/* Berat Barang */}
                                <div className="mb-4">
                                    <label className="form-label text-muted">Berat Barang (kg)</label>
                                    <input
                                        type="number"
                                        className="form-control py-3 border-2 border-gray-300 rounded-md"
                                        value={berat}
                                        onChange={(e) => setBerat(e.target.value)}
                                        placeholder="Masukkan berat barang"
                                        step="0.01"
                                    />
                                    {error.berat && (
                                        <div className="alert alert-danger mt-2">
                                            {error.berat}
                                        </div>
                                    )}
                                </div>

                                {/* Foto Barang */}
                                <div className="mb-4">
                                    <label className="form-label text-muted">Foto Barang</label>
                                    <input
                                        type="file"
                                        className="form-control py-3 border-2 border-gray-300 rounded-md"
                                        onChange={handleFileChange}
                                    />
                                    {error.foto && (
                                        <div className="alert alert-danger mt-2">
                                            {error.foto}
                                        </div>
                                    )}
                                </div>

                                {/* Tombol Submit */}
                                <div className="d-flex justify-content-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg rounded-pill shadow-lg w-50"
                                    >
                                        Simpan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
