import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Api from "../../api";

export default function PostsEdit() {
    const [namaBarang, setNamaBarang] = useState("");
    const [berat, setBerat] = useState("");
    const [image, setImage] = useState("");

    const [error, setError] = useState({});

    const navigate = useNavigate();

    const { id } = useParams();

    const fetchDataPosts = async () => {
        await Api.get(`/barangs/${id}`)
            .then(response => {
                setNamaBarang(response.data.data.nama_barang);
                setBerat(response.data.data.berat);
                setImage(response.data.data.foto);
            })
    };

    useEffect(() => {
        fetchDataPosts();
    }, []);

    const handleFileChange = async (e) => {
        e.preventDefault();
        setImage(e.target.files[0]);

        const formData = new FormData();
        formData.append("nama_barang", namaBarang);
        formData.append("berat", berat);
        formData.append("foto", image);
        formData.append("_method", "PUT");

        await Api.post(`/barangs/${id}`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )
            .then(() => {
                navigate("/posts");
            })
            .catch((error) => {
                setError(error.response.data);
            });
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 shadow">
                        <div className="card-body">
                            <form onSubmit={handleFileChange}>
                                <div className="mb-3">
                                    <label className="form-label">Nama Barang</label>
                                    <input type="text" className="form-control" id="nama_barang" value={namaBarang} onChange={(e) => setNamaBarang(e.target.value)} />
                                    {
                                        error.nama_barang && (
                                            <div className="alert alert-danger">
                                                {error.nama_barang}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Berat</label>
                                    <input type="text" className="form-control" id="berat" value={berat} onChange={(e) => setBerat(e.target.value)} />
                                    {
                                        error.berat && (
                                            <div className="alert alert-danger">
                                                {error.berat}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Foto</label>
                                    <input type="file" className="form-control" id="foto" onChange={handleFileChange} />
                                    {
                                        error.image && (
                                            <div className="alert alert-danger">
                                                {error.image}
                                            </div>
                                        )
                                    }
                                    {image && <img src={image} alt="Preview" style={{ width: "100px" }} className="mt-2" />}
                                </div>
                                <button type="submit" className="btn btn-primary rounded-sm ">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}