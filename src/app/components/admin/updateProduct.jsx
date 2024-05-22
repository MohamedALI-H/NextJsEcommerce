"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { updateProductById } from "../../services/ProdcutService";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UpdateProduct = ({ product, categories }) => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [designation, setDesignation] = useState("");
  const [prix, setPrix] = useState("");
  const [marque, setMarque] = useState("");
  const [qtestock, setQtestock] = useState("");
  const [imageart, setImageart] = useState("");
  const [categorieID, setCategorieID] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setTitle(product.title);
    setDesignation(product.description);
    setPrix(product.price);
    setMarque(product.brand);
    setQtestock(product.stockQuantity);
    setImageart(product.images[0]); // Assuming only one image
    setCategorieID(product.category);
    setFiles([
      {
        source: product.images[0],
        options: { type: "local" },
      },
    ]);
  }, [product]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      const productEdited = {
        _id: product._id,
        title: title,
        slug: designation.toLowerCase().replace(/\s+/g, "-"),
        description: designation,
        price: parseFloat(prix),
        images: [imageart],
        category: categorieID,
        stockQuantity: parseInt(qtestock),
        timesBought: 0,
        brand: marque,
      };
      try {
        await updateProductById(productEdited);
        alert("Product updated successfully!");
      } catch (error) {
        console.log(error);
        alert("Erreur ! Modification non effectuée");
      }
    }
    setValidated(true);
  };

  const serverOptions = {
    process: (fieldName, file, metadata, load, error, progress, abort) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "jklj8ugv");
      data.append("cloud_name", "dmnuz4h65");
      data.append("public_id", file.name);
      axios
        .post("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", data)
        .then((response) => response.data)
        .then((data) => {
          console.log(data);
          setImageart(data.url);
          load(data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          error("Upload failed");
          abort();
        });
    },
  };

  return (
    <div className="container mx-auto p-4">
      <form noValidate validated={validated} onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Modification Produit</h2>
        <div className="w-full flex justify-center">
          <div className="w-full">
            <div className="form mt-3">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  required
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input input-bordered w-full"
                />
                <div className="invalid-feedback text-red-500">
                  Saisir Title Article
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Désignation *</label>
                <input
                  required
                  type="text"
                  placeholder="Désignation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="input input-bordered w-full"
                />
                <div className="invalid-feedback text-red-500">
                  Saisir Désignation
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Marque *</label>
                <input
                  type="text"
                  required
                  placeholder="Marque"
                  value={marque}
                  onChange={(e) => setMarque(e.target.value)}
                  className="input input-bordered w-full"
                />
                <div className="invalid-feedback text-red-500">
                  Marque Incorrecte
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Prix</label>
                <input
                  type="number"
                  placeholder="Prix"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Qté stock<span className="req-tag">*</span>
                </label>
                <input
                  required
                  type="number"
                  value={qtestock}
                  onChange={(e) => setQtestock(e.target.value)}
                  placeholder="Qté stock"
                  className="input input-bordered w-full"
                />
                <div className="invalid-feedback text-red-500">
                  Qté stock Incorrect
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Image</label>
                <div className="w-full">
                  <FilePond
                    files={files}
                    acceptedFileTypes="image/*"
                    onupdatefiles={setFiles}
                    allowMultiple={false}
                    server={serverOptions}
                    name="file"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Catégorie</label>
                <select
                  value={categorieID}
                  onChange={(e) => setCategorieID(e.target.value)}
                  className="input input-bordered w-full"
                >
                  <option></option>
                  {categories?.map((scat) => (
                    <option key={scat._id} value={scat._id}>
                      {scat.nomscategorie}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Valider
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
