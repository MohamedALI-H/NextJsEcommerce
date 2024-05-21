'use client'
import React, { useState } from "react";
import { createProduct } from "../../services/ProductService";
import axios from "axios";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const NewProduct = ({ categories }) => {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [designation, setDesignation] = useState("");
  const [prix, setPrix] = useState("");
  const [marque, setMarque] = useState("");
  const [qtestock, setQtestock] = useState("");
  const [imageart, setImageart] = useState("");
  const [categorieID, setCategorieID] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const newProduct = {
        title: designation,
        slug: designation.toLowerCase().replace(/\s+/g, '-'),
        description: designation,
        price: parseFloat(prix),
        images: [imageart],
        category: categorieID,
        properties: {},
        stockQuantity: parseInt(qtestock),
        timesBought: 0,
        brand: marque,
      };
      try {
        const res = await createProduct(newProduct);
        //redirect here
      } catch (error) {
        alert("Erreur ! Insertion non effectuée");
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
      axios.
      post('https://api.cloudinary.com/v1_1/dmnuz4h65/image/upload', data)
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
    <div className="p-6 bg-white shadow-md rounded-lg">
      <form noValidate validated={validated.toString()} onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Ajout Produit</h2>
        <div className="container mx-auto flex flex-col items-center">
          <div className="w-full">
            <div className="mt-3">
              <div className="mb-2 flex flex-wrap">
                <div className="w-full md:w-1/2 md:pr-2 mb-2">
                  <label className="block font-medium">Title *</label>
                  <input
                    required
                    type="text"
                    placeholder="Référence"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border-gray-300 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="text-red-500 mt-1">Saisir Title Article</div>
                </div>
                <div className="w-full md:w-1/2 md:pl-2 mb-2">
                  <label className="block font-medium">Désignation *</label>
                  <input
                    required
                    type="text"
                    placeholder="Désignation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full border-gray-300 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="text-red-500 mt-1">Saisir Désignation</div>
                </div>
              </div>
              <div className="mb-2 flex flex-wrap">
                <div className="w-full md:w-1/2 md:pr-2 mb-2">
                  <label className="block font-medium">Marque *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Marque"
                      value={marque}
                      onChange={(e) => setMarque(e.target.value)}
                      className="w-full border-gray-300 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="text-red-500 mt-1">Marque Incorrecte</div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 md:pl-2 mb-2">
                  <label className="block font-medium">Prix</label>
                  <input
                    type="number"
                    placeholder="Prix"
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)}
                    className="w-full border-gray-300 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mb-3 flex flex-wrap">
                <div className="w-full md:w-1/2 md:pr-2 mb-2">
                  <label className="block font-medium">Qté stock<span className="text-red-500">*</span></label>
                  <input
                    required
                    type="number"
                    value={qtestock}
                    onChange={(e) => setQtestock(e.target.value)}
                    placeholder="Qté stock"
                    className="w-full border-gray-300 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="text-red-500 mt-1">Qté stock Incorrect</div>
                </div>
                <div className="w-full md:w-1/2 md:pl-2 mb-2">
                  <label className="block font-medium">Image</label>
                  <div className="w-full mt-2">
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
                <div className="w-full">
                  <label className="block font-medium">Catégorie</label>
                  <select
                    value={categorieID}
                    onChange={(e) => setCategorieID(e.target.value)}
                    className="w-full border-gray-300 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value=""></option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">Enregistrer</button>
          <button type="button" className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition duration-300" onClick={() => handleReset()}>Annuler</button>
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
