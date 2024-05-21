import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { updateProductById } from "@/services/productService";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UpdateProduct = ({ product,categories}) => {
  const [files, setFiles] = useState([]);
  const[title,setTitle]=useState("");

  const [designation, setDesignation] = useState("");
  const [prix, setPrix] = useState("");
  const [marque, setMarque] = useState("");
  const [qtestock, setQtestock] = useState("");
  const [imageart, setImageart] = useState("");
  const [categorieID, setCategorieID] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setReference(product.title);
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
        slug: designation.toLowerCase().replace(/\s+/g, '-'),
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
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h2>Modification Produit</h2>
        <div className="container w-100 d-flex justify-content-center">
          <div>
            <div className="form mt-3">
              <Row className="mb-2">
                <Form.Group as={Col} md="6">
                  <Form.Label>Title *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Title"
                    value={reference}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                 <Form.Control.Feedback type="invalid" className="block text-red-500">
              Saisir Title Article
            </Form.Control.Feedback>
               
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Désignation *</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Désignation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Saisir Désignation
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-2">
                <Form.Group className="col-md-6">
                  <Form.Label>Marque *</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      required
                      placeholder="Marque"
                      value={marque}
                      onChange={(e) => setMarque(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Marque Incorrecte
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Prix</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Prix"
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="col-md-6">
                  <Form.Label>
                    Qté stock<span className="req-tag">*</span>
                  </Form.Label>
                  <Form.Control
                    required
                    type="number"
                    value={qtestock}
                    onChange={(e) => setQtestock(e.target.value)}
                    placeholder="Qté stock"
                  />
                  <Form.Control.Feedback type="invalid">
                    Qté stock Incorrect
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Image</Form.Label>
                  <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
                    <FilePond
                      files={files}
                      acceptedFileTypes="image/*"
                      onupdatefiles={setFiles}
                      allowMultiple={false}
                      server={serverOptions}
                      name="file"
                    />
                  </div>
                </Form.Group>
                <Form.Group as={Col} md="12">
                  <Form.Label>Catégorie</Form.Label>
                  <Form.Control
                    as="select"
                    value={categorieID}
                    onChange={(e) => setCategorieID(e.target.value)}
                  >
                    <option></option>
                    {categories?.map((scat) => (
                      <option key={scat._id} value={scat._id}>
                        {scat.nomscategorie}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Row>
            </div>
          </div>
        </div>
        <Button type="submit">Valider</Button>
      </Form>
    </div>
  );
};

export default UpdateProduct;
