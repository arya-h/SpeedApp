import React from "react";
import { Link } from "react-router-dom";
import { IdeaList } from "./IdeaList";
import { Box } from "@chakra-ui/layout";

export const IdeasScreen = () => {

  return (
    <Box className="container-fluid px-5" w="100%" h="200px" bgGradient="linear(to-t, green.200, pink.500)" >
    <div>      
      {/* <div className="container-fluid px-5"> */}
  
        {/* TODO: Sidebar */}
        <div className="row">
          <div className="col-6">
            <h1 className="my-3">Ideas</h1>
          </div>
          <div className="col-6 text-end">
            <Link to="/add">
              <button
                className="btn btn-primary mt-3"
              >
                Add New Idea
              </button>
            </Link>
          </div>
        </div>
        <IdeaList />
      </div>
      
    {/* </div> */}
    </Box>
  );
};
