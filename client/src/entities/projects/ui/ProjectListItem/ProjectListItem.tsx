import React from "react";
import clsx from "clsx";

import type { IProject } from "shared/types";

import styles from "./ProjectListItem.module.css";

interface IProps {
  project: IProject;
  children: React.ReactNode;
}

//** TODO: it may be a good idea to transfer this to html table, makes more sense to me now */

const ProjectListItem: React.FC<IProps> = ({ project, children }) => {
  return (
    <>
      <div className={styles.dataCell} data-name="client">
        {project.client.name}
      </div>
      <div className={clsx(styles.dataCell, styles.date)} data-name="date">
        <time>{new Date(project.date).toLocaleDateString("default")}</time>
      </div>
      <div className={styles.dataCell} data-name="project nr">
        {project.projectNr}
      </div>
      <div
        className={clsx(
          styles.dataCell,
          project.payment === 0 && styles.paymentZero
        )}
        data-name="payment"
      >
        {project.payment}
      </div>
      <div
        className={clsx(styles.dataCell, styles.comments)}
        data-name="comments"
      >
        {project.comments && project.comments?.length > 30
          ? project.comments.slice(0, 30) + "..."
          : project.comments}
      </div>
      <div className={styles.dataCell} data-name="actions">
        {children}
      </div>
    </>
  );
};

export { ProjectListItem };
