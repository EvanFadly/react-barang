import { useState, useEffect } from "react"

import api from "../../api"

import { Link } from "react-router-dom"

export default function PostsIndex() {
    const [posts, setPosts] = useState([])

    const fetchDataPosts = async () => {
        await api.get("/barangs").then((response) => {
            console.log(response.data.data.data);
            setPosts(response.data.data.data);
        })
    };

    useEffect(() => {
        fetchDataPosts();
    }, []);

    const deletePost = async (id) => {
        await api.delete(`/barangs/${id}`).then(() => {
            fetchDataPosts();
        });
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="flex justify-end">
                <Link to={"/posts/create"} className="btn btn-sm btn-primary mb-3 p-2">
                    Create
                </Link>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 shadow">
                        <div className="card-body">
                            <table className="table table-striperd table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Barang</th>
                                        <th scope="col">Berat</th>
                                        <th>Foto</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {posts.map((post) => (
                                        <tr key={post.id}>
                                            <td>{post.id}</td>
                                            <td>{post.nama_barang}</td>
                                            <td>{post.berat}</td>
                                            <td>
                                                <img src={post.foto} alt="" style={{ width: "100px" }} />
                                            </td>
                                            <td>
                                                <Link to={`/posts/edit/${post.id}`} className="btn btn-sm btn-warning mr-1">Edit</Link>
                                                <button  onClick={() => deletePost(post.id)} className="btn btn-sm btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}