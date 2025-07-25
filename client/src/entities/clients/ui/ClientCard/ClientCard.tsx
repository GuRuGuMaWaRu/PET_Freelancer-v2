import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { SlOptions, SlArrowDown } from "react-icons/sl";

import { Dropdown } from "shared/ui";

import type {
  IClientWithProjectData,
  TClientDataItem,
} from "../../types/clients.types";
import { clientDataItems } from "../../const/clients.const";
import styles from "./ClientCard.module.css";

interface IProps {
  client: IClientWithProjectData;
  isExpandedAll: boolean;
  sortBy: TClientDataItem;
}

function ClientCard({ client, isExpandedAll, sortBy }: IProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsExpanded(isExpandedAll);
  }, [isExpandedAll]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const mainItemName =
    sortBy === clientDataItems.name.sortName
      ? clientDataItems.daysSinceLastProject.displayName
      : clientDataItems[sortBy].displayName;

  const mainItemData =
    sortBy === clientDataItems.name.sortName
      ? client.daysSinceLastProject
      : sortBy === clientDataItems.totalEarnings.sortName
      ? client.totalEarnings.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })
      : client[sortBy];

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.clientName}>{client.name}</h3>
        <Dropdown
          trigger={
            <button className={styles.optionsButton}>
              <SlOptions />
            </button>
          }
          menu={[
            <button className={styles.optionsItem}>Edit</button>,
            <button className={styles.optionsItem}>Delete</button>,
          ]}
          dropdownStyles={{
            width: "100px",
            borderRadius: "5px",
            background: "#529596",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
          }}
        />
      </div>
      <div className={styles.clientDataItem}>
        <div>{mainItemName}</div>
        <div
          className={clsx(
            sortBy === clientDataItems.totalEarnings.sortName &&
              styles.totalEarnings,
            sortBy === clientDataItems.daysSinceLastProject.sortName &&
              client.daysSinceLastProject > 90 &&
              styles.daysSinceLastProject
          )}
        >
          {mainItemData}
        </div>
      </div>
      <div
        className={clsx(
          styles.clientData,
          isExpanded && styles.clientDataExpanded
        )}
      >
        {Object.entries(clientDataItems)
          .filter(([sortName]) => {
            if (sortName === clientDataItems.name.sortName) {
              return false;
            }
            if (
              sortBy === clientDataItems.name.sortName &&
              sortName === clientDataItems.daysSinceLastProject.sortName
            ) {
              return false;
            } else {
              return sortName !== sortBy;
            }
          })
          .map(([sortName, { displayName }]) => (
            <div className={styles.clientDataItem} key={sortName}>
              <div>{displayName}</div>
              <div
                className={clsx(
                  displayName === clientDataItems.totalEarnings.displayName &&
                    styles.totalEarnings,
                  displayName ===
                    clientDataItems.daysSinceLastProject.displayName &&
                    client.daysSinceLastProject > 90 &&
                    styles.daysSinceLastProject
                )}
              >
                {sortName === clientDataItems.totalEarnings.sortName
                  ? client.totalEarnings.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                  : client[sortName as TClientDataItem]}
              </div>
            </div>
          ))}
      </div>
      <div className={styles.showMoreButtonContainer}>
        <button
          className={styles.showMoreButton}
          onClick={toggleExpand}
          aria-label="Show more"
        >
          <SlArrowDown
            className={clsx(
              styles.showMoreButtonIcon,
              isExpanded && styles.showMoreButtonIconExpanded
            )}
          />
        </button>
      </div>
    </div>
  );
}

export { ClientCard };
