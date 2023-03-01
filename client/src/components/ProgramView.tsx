import React from "react";
import styled from "styled-components";
import { SubmitButton, Triangle } from "../styles/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFetchWorkoutPlansQuery } from "../utils/api";

axios.defaults.withCredentials = true;

const SuperFrame = styled.div`
  height: 50vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Frame = styled.div`
  background-color: #f9dac3;
  height: 50vh;
  width: 60vw;
  margin-left: 30px;
  text-align: center;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;
const Frame2 = styled.div`
  background-color: #f9dac3;
  height: 50vh;
  width: 30vw;
  text-align: center;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  justify-self: flex-end;
  margin-right: 30px;
  float: left;
`;
const Title = styled.h1`
  color: #f16a00;
  font-size: 4em;
  text-align: center;
  margin: 0;
`;
const Page = styled.main`
  height: 92vh;
  overflow-y: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ProgramItem = styled.div`
  margin: 20px;
  border-bottom: black;
  border-bottom: 2px solid #f16a00;
  cursor: pointer;
`;
const Title2 = styled.h1`
  color: #f16a00;
  font-size: 3em;
  text-align: left;
  opacity: 1;
  margin: 0;
  cursor: pointer;
`;

const ProgramView: React.FC = () => {
  const navigate = useNavigate();

  const { data } = useFetchWorkoutPlansQuery();

  return (
    <>
      <Page>
        <Title>Your Programs</Title>
        <SuperFrame>
          <Frame>
            {data?.length == 0 ? (
              <h1>No workoutprograms</h1>
            ) : (
              data?.map((item, index) => (
                <ProgramItem
                  key={index}
                  onClick={() => {
                    navigate(`/viewworkouts/${item._id}`);
                  }}
                >
                  <Title2>{item.workoutPlanName}</Title2>
                </ProgramItem>
              ))
            )}
          </Frame>
          <Frame2>
            <SubmitButton
              style={{ marginBottom: "20px" }}
              type="submit"
              onClick={() => navigate("/newprogram")}
            >
              New Workout Plan
            </SubmitButton>
          </Frame2>
        </SuperFrame>
        <Triangle style={{ height: "20px" }}></Triangle>
      </Page>
    </>
  );
};

export default ProgramView;
