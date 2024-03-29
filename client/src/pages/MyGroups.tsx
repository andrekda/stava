import React, { useState } from "react";
import styled from "styled-components";
import { Triangle } from "../styles/Form";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import JoinCommunityPopUp from "../components/JoinCommunityPopUp";
import { useNavigate } from "react-router-dom";
import { useFetchUser, useGetGroupsQuery } from "../utils/api";
import CreateGroupPopUp from "../components/CreateGroupPopUp";

const StyledHeader = styled.h1`
  font-size: 3em;
  text-align: center;
  color: #f16a00;
`;

const OuterExercisesContainer = styled.div`
  margin: 0px;
  padding: 0.1em;
  max-height: 400px;
  min-height: 500px;
  width: 50%;
  background-color: #ffc08e;
  border: 3px solid black;
  overflow-y: auto;
`;

const InnerExercisesContainer = styled.div`
  min-width: 650px;
  margin: 0px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
const OrangeText = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 800;
  font-size: 40px;
  margin: 15px;
  line-height: 58px;
  color: #f16a00;
`;

const DataContainer = styled.div`
  width: auto;
  display: flex;
  justify-content: space-between;
  padding: 2em;
`;

const GroupFunctionsContainer = styled.div`
  width: 40%;
  height: 500px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const GroupFunction = styled.div`
  width: 100%;
  background-color: #ffc08e;
  height: 100px;
  border: 2px solid black;
  display: flex;
`;

const GroupButton = styled.button`
  width: 90%;
  height: 60%;
  margin: auto;
  border-radius: 20px;
  background-color: #f16a00;
  border: 0px;
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const GroupName = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-left: 2rem;
  margin-top: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

const MyGroups: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const groups = useGetGroupsQuery();
  const user = useFetchUser();

  const navigate = useNavigate();

  if (groups.isLoading || user.isLoading) {
    return <Loading />;
  }

  if (groups.isError || user.isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <Navbar />
      <StyledHeader>Your groups</StyledHeader>
      <DataContainer>
        <OuterExercisesContainer>
          <InnerExercisesContainer>
            <div className="mx-4">
              {groups.data.length > 0 ? (
                groups.data
                  .sort((a, b) => b.groupName.length - a.groupName.length)
                  .map((element) => {
                    return (
                      <>
                        <div className="row my-1">
                          <a
                            onClick={() =>
                              navigate(`/viewgroup?groupid=${element._id}`)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {element.groupName ==
                            user.data.username + "" + user.data._id ? (
                              <h1 className="fw-bold fw-italic">My Friends </h1>
                            ) : (
                              <h1>{element.groupName} </h1>
                            )}
                          </a>
                        </div>
                      </>
                    );
                  })
              ) : (
                <GroupName>You are not a member of any groups</GroupName>
              )}
            </div>
          </InnerExercisesContainer>
        </OuterExercisesContainer>
        <GroupFunctionsContainer>
          <GroupFunction>
            <GroupButton
              disabled={isVisible ? true : false}
              onClick={() => setIsVisible(!isVisible)}
            >
              Create group
            </GroupButton>
          </GroupFunction>
          <GroupFunction>
            <GroupButton onClick={() => setIsVisible2(!isVisible2)}>
              Join community
            </GroupButton>
          </GroupFunction>
        </GroupFunctionsContainer>
        {isVisible2 ? (
          <JoinCommunityPopUp setIsVisible2={setIsVisible2} />
        ) : null}
        {isVisible ? <CreateGroupPopUp setIsVisible={setIsVisible} /> : null}
      </DataContainer>
    </div>
  );
};

export default MyGroups;
