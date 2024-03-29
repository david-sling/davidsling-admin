import { Add, Edit } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { getCollection, getSchema } from "../../services/actions";

export default function Collection({ setPage }) {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState(null);
  const [schema, setSchema] = useState(null);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    setPage(collectionId);
    getCollection(collectionId, setCollection);
    getSchema(collectionId, setSchema);
  }, [collectionId]);

  useEffect(() => {
    if (!schema?.name) return;
    if (!schema?.fields?.length) setRedirect(`/${collectionId}/edit`);
  }, [schema]);

  if (redirect) return <Redirect to={redirect} />;

  return (
    <div className="Collection">
      <Header title={schema?.name} url={[collectionId]}>
        <Link to={`${collectionId}/edit`}>
          <button className="blue button">
            <p>Edit</p>
            <Edit />
          </button>
        </Link>
        <Link to={`/${collectionId}/new`}>
          <button className="green button">
            <p>New</p>
            <Add />
          </button>
        </Link>
      </Header>
      <section>
        <table id="collection">
          <thead>
            <tr>
              <th>idx</th>
              <th>id</th>
              <th>{schema?._master}</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {schema &&
              collection?.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setRedirect(`/${collectionId}/${item.id}`)}
                >
                  <td>{item.idx + 1}</td>
                  <td>{item.id}</td>
                  <td>{item[schema._master]}</td>
                  <td>
                    {new Date(item._dateCreated.seconds * 1000).toDateString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
