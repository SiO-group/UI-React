import "@sio-group/form-react/sio-form-style.css";
import {Card} from "@sio-group/ui-card";
import {useEffect, useState} from "react";
import {Button} from "@sio-group/ui-core";
import {Confirmation, Modal} from "@sio-group/ui-modal";
import {Pagination} from "@sio-group/ui-pagination";
import {DataTable} from "@sio-group/ui-datatable";
import type {SortState} from "@sio-group/ui-datatable";

import "@sio-group/ui-core/sio-core-style.css";
import "@sio-group/ui-card/sio-card-style.css";
import "@sio-group/ui-modal/sio-modal-style.css";
import "@sio-group/ui-datatable/sio-datatable-style.css";
import "@sio-group/ui-pagination/sio-pagination-style.css";

function App<T extends { id: string | number }>() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
    const [count, setCount] = useState(0);
    const [pagination, setPagination] = useState({
        from: 1,
        to: 20,
        total: 480,
        currentPage: 1,
        pageCount: 24,
    });

    const data = [
        {id: 1, firstName: 'Liam', lastName: 'Nguyen', email: 'liam.nguyen@example.com', birthday: '1992-03-15', active: true, status: {label: 'Active', status: 'success'}, created: '2026-01-15T09:23:45', department: {name: 'Engineering'}, tags: ['frontend', 'react', 'typescript'], projects: [{name: 'Dashboard Redesign'}, {name: 'Component Library'}]},
        {id: 2, firstName: 'Emma', lastName: 'Dubois', email: 'emma.dubois@example.com', birthday: '1985-07-22', active: true, status: {label: 'Verified', status: 'success'}, created: '2026-01-18T14:12:33', department: {name: 'Marketing'}, tags: ['seo', 'content', 'analytics'], projects: [{name: 'Campaign Q1'}, {name: 'Brand Refresh'}]},
        {id: 3, firstName: 'Noah', lastName: 'Visser', email: 'noah.visser@example.com', birthday: '1995-11-03', active: false, status: {label: 'Inactive', status: 'default'}, created: '2026-01-20T11:45:22', department: {name: 'Sales'}, tags: ['crm', 'cold-calling'], projects: [{name: 'Territory Expansion'}]},
        {id: 4, firstName: 'Olivia', lastName: 'Kowalski', email: 'olivia.kowalski@example.com', birthday: '1988-09-12', active: true, status: {label: 'Pending review', status: 'warning'}, created: '2026-01-22T16:30:18', department: {name: 'Product'}, tags: ['product-management', 'agile', 'roadmap'], projects: [{name: 'Mobile App Launch'}, {name: 'User Research'}, {name: 'Feature Prioritization'}]},
        {id: 5, firstName: 'Mason', lastName: 'Rossi', email: 'mason.rossi@example.com', birthday: '1991-12-28', active: false, status: {label: 'Suspended', status: 'error'}, created: '2026-01-25T10:05:55', department: {name: 'HR'}, tags: ['recruitment', 'onboarding'], projects: [{name: 'Employee Handbook'}]},
        {id: 6, firstName: 'Sophia', lastName: 'Meier', email: 'sophia.meier@example.com', birthday: '1993-04-07', active: true, status: {label: 'Active', status: 'success'}, created: '2026-01-28T08:47:12', department: {name: 'Engineering'}, tags: ['backend', 'python', 'aws', 'django'], projects: [{name: 'API Gateway'}, {name: 'Microservices Migration'}]},
        {id: 7, firstName: 'Ethan', lastName: 'Silva', email: 'ethan.silva@example.com', birthday: '1982-06-19', active: true, status: {label: 'Requires attention', status: 'caution'}, created: '2026-02-01T13:21:39', department: {name: 'Finance'}, tags: ['accounting', 'forecasting'], projects: [{name: 'Budget Planning 2026'}, {name: 'Audit Preparation'}]},
        {id: 8, firstName: 'Ava', lastName: 'Nowak', email: 'ava.nowak@example.com', birthday: '1996-10-30', active: false, status: {label: 'Expired', status: 'default'}, created: '2026-02-04T17:58:44', department: {name: 'Customer Support'}, tags: ['zendesk', 'ticketing'], projects: [{name: 'Support Automation'}, {name: 'Knowledge Base'}]},
        {id: 9, firstName: 'Lucas', lastName: 'Andersson', email: 'lucas.andersson@example.com', birthday: '1989-02-14', active: true, status: {label: 'Active', status: 'success'}, created: '2026-02-07T12:33:27', department: {name: 'Engineering'}, tags: ['devops', 'kubernetes', 'terraform', 'ci/cd'], projects: [{name: 'Infrastructure Upgrade'}, {name: 'Monitoring Stack'}]},
        {id: 10, firstName: 'Mia', lastName: 'Fernandez', email: 'mia.fernandez@example.com', birthday: '1994-08-25', active: true, status: {label: 'Needs review', status: 'info'}, created: '2026-02-10T09:14:51', department: {name: 'Design'}, tags: ['ui/ux', 'figma', 'prototyping'], projects: [{name: 'Design System'}, {name: 'Mobile App Design'}, {name: 'Accessibility Audit'}]},
        {id: 11, firstName: 'Oliver', lastName: 'Horvath', email: 'oliver.horvath@example.com', birthday: '1987-05-09', active: false, status: {label: 'Blocked', status: 'error'}, created: '2026-02-13T18:42:06', department: {name: 'Sales'}, tags: ['b2b', 'negotiation'], projects: [{name: 'Enterprise Deals'}]},
        {id: 12, firstName: 'Isabella', lastName: 'Lopez', email: 'isabella.lopez@example.com', birthday: '1990-12-01', active: true, status: {label: 'Active', status: 'success'}, created: '2026-02-16T11:03:33', department: {name: 'Marketing'}, tags: ['social-media', 'email-marketing', 'automation'], projects: [{name: 'Social Campaign'}, {name: 'Newsletter Revamp'}]},
        {id: 13, firstName: 'Elijah', lastName: 'Müller', email: 'elijah.muller@example.com', birthday: '1984-03-28', active: true, status: {label: 'Pending confirmation', status: 'warning'}, created: '2026-02-19T14:29:17', department: {name: 'Product'}, tags: ['analytics', 'user-stories'], projects: [{name: 'User Feedback Platform'}, {name: 'Product Analytics'}]},
        {id: 14, firstName: 'Charlotte', lastName: 'Cohen', email: 'charlotte.cohen@example.com', birthday: '1997-07-14', active: false, status: {label: 'Inactive', status: 'default'}, created: '2026-02-22T10:55:42', department: {name: 'HR'}, tags: ['payroll', 'benefits'], projects: [{name: 'Compensation Review'}]},
        {id: 15, firstName: 'Benjamin', lastName: 'Kumar', email: 'benjamin.kumar@example.com', birthday: '1986-09-23', active: true, status: {label: 'Active', status: 'success'}, created: '2026-02-25T16:18:09', department: {name: 'Engineering'}, tags: ['full-stack', 'javascript', 'node', 'vue'], projects: [{name: 'E-commerce Platform'}, {name: 'Admin Dashboard'}]},
        {id: 16, firstName: 'Amelia', lastName: 'Janssen', email: 'amelia.janssen@example.com', birthday: '1993-11-11', active: true, status: {label: 'Limited access', status: 'caution'}, created: '2026-02-28T08:41:55', department: {name: 'Legal'}, tags: ['compliance', 'contracts'], projects: [{name: 'GDPR Update'}, {name: 'Terms of Service'}]},
        {id: 17, firstName: 'Henry', lastName: 'Petrov', email: 'henry.petrov@example.com', birthday: '1981-04-05', active: false, status: {label: 'Deactivated', status: 'error'}, created: '2026-03-02T13:07:28', department: {name: 'Operations'}, tags: ['logistics', 'supply-chain'], projects: [{name: 'Warehouse Optimization'}]},
        {id: 18, firstName: 'Evelyn', lastName: 'Garcia', email: 'evelyn.garcia@example.com', birthday: '1995-10-18', active: true, status: {label: 'Active', status: 'success'}, created: '2026-03-04T09:52:14', department: {name: 'Engineering'}, tags: ['mobile', 'ios', 'swift', 'android'], projects: [{name: 'Mobile SDK'}, {name: 'Cross-platform App'}]},
        {id: 19, firstName: 'Alexander', lastName: 'Watanabe', email: 'alexander.watanabe@example.com', birthday: '1988-06-30', active: true, status: {label: 'New user', status: 'info'}, created: '2026-03-06T15:23:37', department: {name: 'Design'}, tags: ['illustration', 'animation'], projects: [{name: 'Brand Assets'}, {name: 'Marketing Materials'}]},
        {id: 20, firstName: 'Harper', lastName: 'Martinez', email: 'harper.martinez@example.com', birthday: '1992-02-21', active: false, status: {label: 'Inactive', status: 'default'}, created: '2026-03-08T11:46:52', department: {name: 'Customer Support'}, tags: ['live-chat', 'escalations'], projects: [{name: 'Support Portal'}]},
        {id: 21, firstName: 'Daniel', lastName: 'Chen', email: 'daniel.chen@example.com', birthday: '1985-12-13', active: true, status: {label: 'Active', status: 'success'}, created: '2026-03-10T10:19:43', department: {name: 'Engineering'}, tags: ['data-engineering', 'spark', 'sql', 'airflow'], projects: [{name: 'Data Warehouse'}, {name: 'ETL Pipeline'}]},
        {id: 22, firstName: 'Ella', lastName: 'Schmidt', email: 'ella.schmidt@example.com', birthday: '1994-07-26', active: true, status: {label: 'Requires verification', status: 'warning'}, created: '2026-03-12T17:34:28', department: {name: 'Marketing'}, tags: ['ppc', 'google-ads'], projects: [{name: 'Ad Campaign'}, {name: 'ROI Analysis'}]},
        {id: 23, firstName: 'Matthew', lastName: 'Bakker', email: 'matthew.bakker@example.com', birthday: '1983-03-10', active: false, status: {label: 'Suspended', status: 'error'}, created: '2026-03-13T12:08:55', department: {name: 'Sales'}, tags: ['account-management'], projects: [{name: 'Client Retention'}]},
        {id: 24, firstName: 'Scarlett', lastName: 'Fischer', email: 'scarlett.fischer@example.com', birthday: '1996-09-05', active: true, status: {label: 'Active', status: 'success'}, created: '2026-03-14T14:51:22', department: {name: 'Product'}, tags: ['product-marketing', 'launch'], projects: [{name: 'Product Launch Q2'}, {name: 'Competitive Analysis'}]},
        {id: 25, firstName: 'David', lastName: 'Gonzalez', email: 'david.gonzalez@example.com', birthday: '1989-05-31', active: true, status: {label: 'Needs attention', status: 'caution'}, created: '2026-03-15T09:27:46', department: {name: 'Engineering'}, tags: ['security', 'penetration-testing'], projects: [{name: 'Security Audit'}, {name: 'Compliance Check'}]},
        {id: 26, firstName: 'Victoria', lastName: 'Roux', email: 'victoria.roux@example.com', birthday: '1991-08-19', active: false, status: {label: 'Expired', status: 'default'}, created: '2026-03-16T16:43:19', department: {name: 'Finance'}, tags: ['tax', 'reporting'], projects: [{name: 'Annual Report'}]},
        {id: 27, firstName: 'Joseph', lastName: 'Hernandez', email: 'joseph.hernandez@example.com', birthday: '1986-11-24', active: true, status: {label: 'Active', status: 'success'}, created: '2026-03-17T08:15:33', department: {name: 'Engineering'}, tags: ['machine-learning', 'python', 'tensorflow'], projects: [{name: 'Recommendation Engine'}, {name: 'Predictive Analytics'}]},
        {id: 28, firstName: 'Grace', lastName: 'Olsen', email: 'grace.olsen@example.com', birthday: '1993-04-16', active: true, status: {label: 'Pending approval', status: 'info'}, created: '2026-03-18T13:22:47', department: {name: 'Design'}, tags: ['user-research', 'usability'], projects: [{name: 'Usability Testing'}, {name: 'User Personas'}]},
        {id: 29, firstName: 'Samuel', lastName: 'Kim', email: 'samuel.kim@example.com', birthday: '1982-10-07', active: false, status: {label: 'Blocked', status: 'error'}, created: '2026-03-19T11:58:04', department: {name: 'HR'}, tags: ['performance-review'], projects: [{name: 'OKR Implementation'}]},
        {id: 30, firstName: 'Chloe', lastName: 'Fontana', email: 'chloe.fontana@example.com', birthday: '1995-01-28', active: true, status: {label: 'Active', status: 'success'}, created: '2026-03-20T10:34:12', department: {name: 'Engineering'}, tags: ['qa', 'automation', 'jest', 'cypress'], projects: [{name: 'Testing Framework'}, {name: 'E2E Tests'}]},
        {id: 31, firstName: 'Carter', lastName: 'Brown', email: 'carter.brown@example.com', birthday: '1987-07-11', active: true, status: {label: 'Limited access', status: 'warning'}, created: '2026-03-20T14:21:56', department: {name: 'Operations'}, tags: ['facilities', 'vendor-management'], projects: [{name: 'Office Relocation'}]},
        {id: 32, firstName: 'Penelope', lastName: 'Lindberg', email: 'penelope.lindberg@example.com', birthday: '1990-12-22', active: false, status: {label: 'Inactive', status: 'default'}, created: '2026-03-21T09:47:28', department: {name: 'Marketing'}, tags: ['events', 'webinars'], projects: [{name: 'Virtual Summit'}, {name: 'Conference Planning'}]},
        {id: 33, firstName: 'Gabriel', lastName: 'Santos', email: 'gabriel.santos@example.com', birthday: '1984-03-03', active: true, status: {label: 'Active', status: 'success'}, created: '2026-03-21T16:05:43', department: {name: 'Engineering'}, tags: ['embedded', 'c++', 'iot'], projects: [{name: 'Smart Device Firmware'}, {name: 'IoT Platform'}]},
        {id: 34, firstName: 'Layla', lastName: 'Moreau', email: 'layla.moreau@example.com', birthday: '1996-06-18', active: true, status: {label: 'Needs verification', status: 'caution'}, created: '2026-03-21T18:33:17', department: {name: 'Product'}, tags: ['roadmap', 'prioritization'], projects: [{name: 'Q3 Roadmap'}, {name: 'Feature Backlog'}]},
        {id: 35, firstName: 'Anthony', lastName: 'Patel', email: 'anthony.patel@example.com', birthday: '1989-09-27', active: false, status: {label: 'Suspended', status: 'error'}, created: '2026-03-22T07:12:39', department: {name: 'Sales'}, tags: ['lead-generation'], projects: [{name: 'Sales Playbook'}]},
        {id: 36, firstName: 'Zoe', lastName: 'Nielsen', email: 'zoe.nielsen@example.com', birthday: '1992-11-09', active: true, status: {label: 'Active', status: 'success'}, created: '2026-03-22T10:51:24', department: {name: 'Engineering'}, tags: ['graphql', 'apollo', 'prisma'], projects: [{name: 'GraphQL Gateway'}, {name: 'API Federation'}]},
        {id: 37, firstName: 'Dylan', lastName: 'Klein', email: 'dylan.klein@example.com', birthday: '1985-08-14', active: true, status: {label: 'New registration', status: 'info'}, created: '2026-03-22T13:26:58', department: {name: 'Customer Success'}, tags: ['onboarding', 'training'], projects: [{name: 'Customer Academy'}, {name: 'Onboarding Flow'}]},
        {id: 38, firstName: 'Nora', lastName: 'Ramos', email: 'nora.ramos@example.com', birthday: '1994-03-29', active: false, status: {label: 'Expired', status: 'default'}, created: '2026-03-22T15:44:12', department: {name: 'Legal'}, tags: ['ip', 'trademarks'], projects: [{name: 'IP Portfolio'}]},
        {id: 39, firstName: 'Isaac', lastName: 'Okafor', email: 'isaac.okafor@example.com', birthday: '1983-12-04', active: true, status: {label: 'Active', status: 'success'}, created: '2026-03-22T17:08:37', department: {name: 'Engineering'}, tags: ['rust', 'systems', 'performance'], projects: [{name: 'Performance Optimization'}, {name: 'System Rewrite'}]},
        {id: 40, firstName: 'Lillian', lastName: 'Wong', email: 'lillian.wong@example.com', birthday: '1997-05-21', active: true, status: {label: 'Requires review', status: 'warning'}, created: '2026-03-22T18:55:03', department: {name: 'Design'}, tags: ['motion-design', 'after-effects'], projects: [{name: 'Product Animations'}, {name: 'Video Content'}]},
        {id: 41, firstName: 'Julian', lastName: 'Ivanov', email: 'julian.ivanov@example.com', birthday: '1988-07-08', active: false, status: {label: 'Inactive', status: 'default'}, created: '2026-03-22T19:23:46', department: {name: 'Finance'}, tags: ['audit', 'compliance'], projects: [{name: 'Internal Audit'}]},
        {id: 42, firstName: 'Hannah', lastName: 'Cruz', email: 'hannah.cruz@example.com', birthday: '1991-10-15', active: true, status: {label: 'Active', status: 'success'}, created: '2026-03-22T20:11:29', department: {name: 'Engineering'}, tags: ['frontend', 'webpack', 'vite', 'nextjs'], projects: [{name: 'Build Tooling'}, {name: 'Performance Monitoring'}]},
        {id: 43, firstName: 'Wyatt', lastName: 'Mertens', email: 'wyatt.mertens@example.com', birthday: '1986-02-26', active: true, status: {label: 'Pending', status: 'caution'}, created: '2026-03-22T20:47:55', department: {name: 'Marketing'}, tags: ['influencer', 'partnerships'], projects: [{name: 'Influencer Campaign'}, {name: 'Brand Ambassadors'}]},
        {id: 44, firstName: 'Aria', lastName: 'Sato', email: 'aria.sato@example.com', birthday: '1993-09-19', active: false, status: {label: 'Blocked', status: 'error'}, created: '2026-03-22T21:18:33', department: {name: 'Operations'}, tags: ['procurement'], projects: [{name: 'Vendor Consolidation'}]},
        {id: 45, firstName: 'Leo', lastName: 'Bergman', email: 'leo.bergman@example.com', birthday: '1980-11-02', active: true, status: {label: 'Active', status: 'success'}, created: '2026-03-22T21:52:17', department: {name: 'Engineering'}, tags: ['database', 'postgresql', 'mongodb'], projects: [{name: 'Database Migration'}, {name: 'Query Optimization'}]},
        {id: 46, firstName: 'Ellie', lastName: 'Haddad', email: 'ellie.haddad@example.com', birthday: '1995-12-23', active: true, status: {label: 'Setup incomplete', status: 'info'}, created: '2026-03-22T22:14:48', department: {name: 'Product'}, tags: ['user-stories', 'acceptance-criteria'], projects: [{name: 'Feature Specs'}, {name: 'User Documentation'}]},
        {id: 47, firstName: 'Thomas', lastName: 'Lefevre', email: 'thomas.lefevre@example.com', birthday: '1984-04-12', active: false, status: {label: 'Inactive', status: 'default'}, created: '2026-03-22T22:39:22', department: {name: 'HR'}, tags: ['diversity', 'inclusion'], projects: [{name: 'DEI Initiative'}]},
        {id: 48, firstName: 'Lucy', lastName: 'Khalil', email: 'lucy.khalil@example.com', birthday: '1996-08-04', active: true, status: {label: 'Active', status: 'success'}, created: '2026-03-22T23:03:56', department: {name: 'Engineering'}, tags: ['nlp', 'python', 'transformers'], projects: [{name: 'Chatbot'}, {name: 'Text Analytics'}]},
        {id: 49, firstName: 'Nathan', lastName: 'Stein', email: 'nathan.stein@example.com', birthday: '1987-06-15', active: true, status: {label: 'Verification needed', status: 'warning'}, created: '2026-03-22T23:28:41', department: {name: 'Sales'}, tags: ['demo', 'presales'], projects: [{name: 'Sales Enablement'}, {name: 'Demo Environment'}]},
        {id: 50, firstName: 'Stella', lastName: 'Vargas', email: 'stella.vargas@example.com', birthday: '1990-01-30', active: false, status: {label: 'Expired', status: 'error'}, created: '2026-03-22T23:55:17', department: {name: 'Customer Support'}, tags: ['crm', 'retention'], projects: [{name: 'Customer Health Score'}, {name: 'Churn Reduction'}]}
    ];

    const [pagedData, setPagedData] = useState(data.slice(0, 5));
    const [dataSearch, setDataSearch] = useState('');
    const [dataSort, setDataSort] = useState<SortState<T> | null>(null);
    const [dataPagination, setDataPagination] = useState({
        from: 1,
        to: 5,
        total: data.length,
        currentPage: 1,
        pageCount: Math.ceil(data.length / 5),
    });

    useEffect(() => {
        let result = [...data];

        if (dataSearch) {
            result = result.filter((item) =>
                ['firstName', 'lastName', 'email', 'birthday', 'status'].some((key) =>
                    // @ts-ignore
                    String(item[key]).toLowerCase().includes(dataSearch.toLowerCase())
                )
            );
        }

        if (dataSort) {
            result.sort((a, b) => {
                // @ts-ignore
                const aVal: string = String(a[dataSort.name]);
                // @ts-ignore
                const bVal: string = String(b[dataSort.name]);
                return dataSort.direction === 'asc'
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            });
        }

        setPagedData(result.slice(dataPagination.from - 1, (dataPagination.from + 5) - 1));
        setDataPagination({
            from: 1,
            to: 5,
            total: result.length,
            currentPage: 1,
            pageCount: Math.ceil(result.length / 5),
        });
    }, [dataSearch, dataSort]);

    return (
        <div style={{ padding: '2rem' }}>
            <h1>UI Demo Project</h1>

            {/* UI Core Button */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>UI Core Button</h2>
                <Button onClick={() => setCount(c => c + 1)}>
                    Clicked {count} times
                </Button>
            </section>

            {/* UI Card */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>UI Card</h2>
                <Card title="Demo Card">
                    <p>This is a card from @sio-group/ui-card</p>
                    <Button variant="secondary">Card Action</Button>
                </Card>

                <Card
                    title="Demo Card"
                    actions={[
                        {
                            type: 'button',
                            variant: 'primary',
                            label: 'Card action'
                        }
                    ]}
                    addShadow
                >
                    <p>This is a card from @sio-group/ui-card</p>
                </Card>
            </section>

            {/* UI Modal */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>UI Modal</h2>
                <div className="btn-group">
                    <Button onClick={() => setIsModalOpen(true)}>
                        Open Modal
                    </Button>
                    <Button onClick={() => setIsConfirmationOpen(true)}>
                        Open Confirmation
                    </Button>
                </div>

                <Modal
                    show={isModalOpen}
                    close={() => setIsModalOpen(false)}
                    title="Demo Modal"
                    actions={[
                        {
                            type: 'button',
                            variant: 'primary',
                            label: 'Custom button'
                        }
                    ]}
                >
                    <p>This is a modal from @sio-group/ui-modal</p>
                </Modal>

                <Confirmation
                    show={isConfirmationOpen}
                    onConfirm={() => {
                        alert("you clicked confirm");
                        setIsConfirmationOpen(false);
                    }}
                    onCancel={() => setIsConfirmationOpen(false)}
                    title={"This is important"}
                    subtitle={"Are you sure you want this?"}
                    body={"This action will have severe consequences. Are you sure you want to proceed?"}
                    confirmLabel="Hell yeah!"
                    cancelLabel="No way"
                />
            </section>

            {/* UI Pagination */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>UI Pagination</h2>


                <Pagination
                    from={pagination.from}
                    to={pagination.to}
                    total={pagination.total}
                    currentPage={pagination.currentPage}
                    pageCount={pagination.pageCount}
                    onPaginate={(page) => setPagination(prev => ({
                        ...prev,
                        from: ((page - 1) * 20) + 1,
                        to: page * 20,
                        currentPage: page,
                    }))}
                />
            </section>

            {/* UI Data Table */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>UI Data Table</h2>

                <DataTable
                    columns={[
                        {name: 'active', label: ''},
                        {name: 'firstName', label: 'Voornaam', sort: true},
                        {name: 'lastName', label: 'Achternaam', sort: true},
                        {name: 'email', label: 'E-mail', sort: true},
                        {name: 'department', label: 'Departement', sort: true},
                        {name: 'projects', label: 'Projecten', sort: true},
                        {name: 'birthday', label: 'Verjaardag', sort: true},
                        {name: 'status', label: 'Status', sort: true},
                        {name: 'tags', label: 'Tags'},
                        {name: 'created', label: 'Creatie'},
                    ]}
                    data={data}
                    clientPageSize={5}
                    clientSearchKeys={[ 'firstName', 'lastName', 'email' ]}
                    entity={{ name: 'users', label: 'Gebruikers'}}
                    actionMenu={{
                        type: 'dropdown',
                        actions: [
                            {name: 'action-1', label: 'Action 1', icon: '1', onClick: (temp) => console.log(`clicked 1 ${temp}`)},
                            {name: 'action-2', label: 'Action 2', icon: '2', onClick: (temp) => console.log(`clicked 2 ${temp}`)},
                            {name: 'action-3', label: 'Action 3', icon: '3', onClick: (temp) => console.log(`clicked 3 ${temp}`)},
                            {name: 'action-4', label: 'Action 4', icon: '4', onClick: (temp) => console.log(`clicked 4 ${temp}`)},
                        ]
                    }}
                    renderMenuIcon={() => 'm'}
                />

                <DataTable
                    columns={[
                        {name: 'active', label: '', format: "boolean"},
                        {name: 'firstName', label: 'Voornaam', sort: true},
                        {name: 'lastName', label: 'Achternaam', sort: true},
                        {name: 'email', label: 'E-mail', sort: true, format: "email"},
                        {name: 'department', label: 'Departement', sort: true, format: {key: 'name'}},
                        {name: 'projects', label: 'Projecten', sort: true, format: {key: 'name'}},
                        {name: 'birthday', label: 'Verjaardag', sort: true, format: "date"},
                        {name: 'status', label: 'Status', sort: true, format: "pill"},
                        {name: 'tags', label: 'Tags'},
                        {name: 'created', label: 'Creatie', format: "datetime"},
                    ]}
                    data={pagedData}
                    pagination={dataPagination}
                    onPaginate={(page) => {
                        const from: number = (page - 1) * 5;
                        setPagedData(data.slice(from, from + 5));
                        setDataPagination(prev => ({
                            ...prev,
                            from: ((page - 1) * 5) + 1,
                            to: page * 5,
                            currentPage: page,
                        }))
                    }}
                    onSearch={setDataSearch}
                    searchValue={dataSearch}
                    onSort={setDataSort}
                    sortValue={dataSort}
                    clientPageSize={5}
                    entity={{ name: 'users', label: 'Gebruikers'}}
                    actionMenu={{
                        type: 'dropdown',
                        actions: [
                            {name: 'action-1', label: 'Action 1', icon: '1', onClick: (temp) => console.log(`clicked 1 ${temp}`)},
                            {name: 'action-2', label: 'Action 2', icon: '2', onClick: (temp) => console.log(`clicked 2 ${temp}`)},
                            {name: 'action-3', label: 'Action 3', icon: '3', onClick: (temp) => console.log(`clicked 3 ${temp}`)},
                            {name: 'action-4', label: 'Action 4', icon: '4', onClick: (temp) => console.log(`clicked 4 ${temp}`)},
                        ]
                    }}
                    renderMenuIcon={() => 'm'}
                    onUpdate={(id, values) => console.log(id, values)}
                    formFields={[
                        {name: 'firstName', type: 'text', required: true},
                    ]}
                    renderSortIcon={(direction, active) => {
                        return (
                            <span style={{ opacity: active ? 1 : 0.3, fontSize: '0.7em' }} aria-hidden="true">
                                {direction === 'asc' ? '▲' : '▼'}
                            </span>
                        )
                    }}
                    emptyMessage="Ohh no!!" hover striped
                />
            </section>
        </div>
    )
}

export default App;
