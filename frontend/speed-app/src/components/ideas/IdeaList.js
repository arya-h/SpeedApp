import React, { useEffect, useState } from "react";
import { Col, Row, Dropdown, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IdeaCard } from "./IdeaCard";

export const IdeaList = () => {
  const filter = useSelector((state) => state.filter);
  const { ideas } = useSelector((state) => state.ideas);
  const [sortMethod, setSortMethod] = useState(0);

  const filteredIdeas = ideas.filter((x) =>
    x.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (sortMethod === 1) {
    filteredIdeas.sort((a, b) => b.timestamp - a.timestamp);
  } else if (sortMethod === 2) {
    filteredIdeas.sort((a, b) => a.timestamp - b.timestamp);
  } else if (sortMethod === 3) {
    filteredIdeas.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      return 0
    });
  } else if (sortMethod === 4) {
    filteredIdeas.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return 1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return -1;
      }
      return 0
    });
  }
  // Rerender when list changes (Delete idea)
  useEffect(() => {}, [ideas]);

  return (
    <div>
      {ideas.length === 0 ? (
        <h1>There are no ideas yet</h1>
      ) : (
        <>
          <Row className="mb-2">
            <Col>
              <Form.Select
                className="w-auto ms-auto"
                onChange={(event) =>
                  setSortMethod(parseInt(event.target.value))
                }
              >
                <option value="0">Default Sort</option>
                <option value="1">Date: Newest first</option>
                <option value="2">Date: Oldest first</option>
                <option value="3">Title: A-Z</option>
                <option value="4">Title: Z-A</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            {filteredIdeas.map((i) => (
              <IdeaCard key={i.id} idea={i} />
            ))}
          </Row>
        </>
      )}
    </div>
  );
};
