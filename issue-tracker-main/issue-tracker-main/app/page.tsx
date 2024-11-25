// import prisma from '@/prisma/client';
// import IssueSummary from './IssueSummary';
// import LatestIssues from './LatestIssues';
// import IssueChart from './IssueChart';
// import { Flex, Grid } from '@radix-ui/themes';
// import { Metadata } from 'next';

// export default async function Home() {
//   const open = await prisma.issue.count({
//     where: { status: 'OPEN' },
//   });
//   const inProgress = await prisma.issue.count({
//     where: { status: 'IN_PROGRESS' },
//   });
//   const closed = await prisma.issue.count({
//     where: { status: 'CLOSED' },
//   });

//   return (
//     <Grid columns={{ initial: '1', md: '2' }} gap="5">
//       <Flex direction="column" gap="5">
//         <IssueSummary
//           open={open}
//           inProgress={inProgress}
//           closed={closed}
//         />
//         <IssueChart
//           open={open}
//           inProgress={inProgress}
//           closed={closed}
//         />
//       </Flex>
//       <LatestIssues />
//     </Grid>
//   );
// }

// export const dynamic = 'force-dynamic';

// export const metadata: Metadata = {
//   title: 'Issue Tracker - Dashboard',
//   description: 'View a summary of project issues'
// };

"use client";

import React from "react";
import { Card, Row, Col, Layout } from "antd";
import MyTasksCard from "./components/MyTasksCard";
import MyApprovalsCard from "./components/MyApprovalsCard";
import ReportSummaryCard from "./components/ReportSummaryCard";
import GenerateReportCard from "./components/GenerateReportCard";
const { Content } = Layout;

const { Meta } = Card;

const HomePage = () => {
  return (
    // <div
    //   style={{
    //     height: "100vh", // Fill the entire viewport height
    //     display: "flex",
    //     justifyContent: "center", // Center horizontally
    //     alignItems: "center", // Center vertically
    //     padding: "16px",
    //     boxSizing: "border-box",
    //   }}
    // >
    //   <Card
    //     style={{
    //       width: "100%",
    //       height: "100%",
    //       display: "flex",
    //       flexDirection: "column",
    //       padding: "20px",
    //     }}
    //     title="Dashboard"
    //   >
    //     <Row gutter={16} style={{ flex: 1 }}>
    //       {/* My Tasks Card */}
    //       <Col xs={24} sm={12} lg={6}>
    //         <Card
    //           hoverable
    //           style={{
    //             height: "100%",
    //           }}
    //           cover={
    //             <img alt="My Tasks" src="https://via.placeholder.com/150" />
    //           }
    //         >
    //           <Meta
    //             title="My Tasks"
    //             description="View and manage your tasks."
    //           />
    //         </Card>
    //       </Col>

    //       {/* My Approvals Card */}
    //       <Col xs={24} sm={12} lg={6}>
    //         <Card
    //           hoverable
    //           style={{
    //             height: "100%",
    //           }}
    //           cover={
    //             <img alt="My Approvals" src="https://via.placeholder.com/150" />
    //           }
    //         >
    //           <Meta
    //             title="My Approvals"
    //             description="View and approve pending tasks."
    //           />
    //         </Card>
    //       </Col>
    //     </Row>

    //     <Row gutter={16} style={{ flex: 1 }}>
    //       {/* My Sites Card */}
    //       <Col xs={24} sm={12} lg={6}>
    //         <Card
    //           hoverable
    //           style={{
    //             height: "100%",
    //           }}
    //           cover={
    //             <img alt="My Sites" src="https://via.placeholder.com/150" />
    //           }
    //         >
    //           <Meta
    //             title="My Sites"
    //             description="View and manage your sites."
    //           />
    //         </Card>
    //       </Col>

    //       {/* Task Summary Card */}
    //       <Col xs={24} sm={12} lg={6}>
    //         <Card
    //           hoverable
    //           style={{
    //             height: "100%",
    //           }}
    //           cover={
    //             <img alt="Task Summary" src="https://via.placeholder.com/150" />
    //           }
    //         >
    //           <Meta
    //             title="Task Summary"
    //             description="View summary of all tasks."
    //           />
    //         </Card>
    //       </Col>
    //     </Row>
    //   </Card>
    // </div>
    // <MyTasksCard></MyTasksCard>
    // import { Row, Col, Layout } from "antd";

    // const { Content } = Layout;

    // <Content></Content>
    <Content
      style={{
        height: "80vh", // Fixed height to trigger scrolling
        overflow: "auto", // Makes the content scrollable
        padding: 0, // Remove card padding to prevent extra space around content
      }}
    >
      <Row
        gutter={[0, 0]} // Reduced gutter size to reduce the space between columns and rows
        style={{
          width: "100%",
          margin: 0, // Ensure no margins around the rows
          padding: 0,
        }}
      >
        {/* First row with two columns */}
        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: 0 }}>
          {/* <Card style={{ height: "100%", margin: 0 }}> */}
          <MyTasksCard />
          {/* </Card> */}
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: 0 }}>
          {/* <Card style={{ height: "100%", margin: 0 }}> */}
          <ReportSummaryCard />
          {/* </Card> */}
        </Col>
      </Row>

      <Row
        gutter={[8, 8]} // Reduced gutter size for the second row
        style={{
          width: "100%",
          margin: 0, // Ensure no margins around the second row
        }}
      >
        {/* Second row with two columns */}
        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: 0 }}>
          {/* <Card style={{ height: "100%", margin: 0 }}> */}
          <MyApprovalsCard />
          {/* </Card> */}
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12} style={{ padding: 0 }}>
          {/* <Card style={{ height: "100%", margin: 0 }}> */}
          <GenerateReportCard />
          {/* </Card> */}
        </Col>
      </Row>
    </Content>
  );
};

export default HomePage;
