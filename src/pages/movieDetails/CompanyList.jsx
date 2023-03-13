import React from "react";

import Wrapper from "../../components/ui/Wrapper";

import classes from  './CompanyList.module.scss'

const CompanyList = ({companies}) => {
  return (
    <section className={classes.companies}>
      <Wrapper>
        <ul className={classes.list}>
          {companies.map(
            (company) =>
              company.logo_path && (
                <li key={company.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${company.logo_path}`}
                    alt={company.name}
                    width={80}
                  />
                </li>
              )
          )}
        </ul>
      </Wrapper>
    </section>
  );
};

export default CompanyList;
