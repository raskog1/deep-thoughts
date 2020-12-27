import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import { QUERY_THOUGHTS } from "../utils/queries";

// Components
import ThoughtList from "../components/ThoughtList";

const Home = () => {
  // Use useQuery hook to make a query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // ? syntax is called optional chaining.  Here, if data exists
  // it will be stored in the const, otherwise store an empty array
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
              <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
            )}
        </div>
      </div>
    </main>
  );
};

export default Home;
