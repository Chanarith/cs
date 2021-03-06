import { Link } from "@inertiajs/inertia-react";
import {
    createStyles,
    Header,
    Container,
    Group,
    Burger,
    Paper,
    Transition,
} from "@mantine/core";

import { useBooleanToggle } from "@mantine/hooks";
import { usePage } from "@inertiajs/inertia-react";

import Authentication from "@/Components/Authentication";
import ProfileDropDown from "./ProfileDropDown";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
    root: {
        position: "sticky",
    },

    logo: {
        cursor: "pointer",
        textTransform: "uppercase",
    },

    dropdown: {
        position: "absolute",
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: "hidden",

        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    button: {
        display: "block",
        lineHeight: 1,
        padding: "8px 12px",
        borderRadius: theme.radius.sm,
        width: "100%",
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
    },

    links: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    burger: {
        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    link: {
        display: "block",
        lineHeight: 1,
        padding: "8px 12px",
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },

        [theme.fn.smallerThan("sm")]: {
            borderRadius: 0,
            padding: theme.spacing.md,
        },
    },

    linkActive: {
        "&, &:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                    : theme.colors[theme.primaryColor][0],
            color: theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 3 : 7
            ],
        },
    },
}));

const links = [
    {
        link: "properties-for-sale",
        label: "For Sale",
        name: "PropertiesForSale",
        id: 1,
    },
    {
        link: "properties-for-rent",
        label: "For Rent",
        name: "PropertiesForRent",
        id: 2,
    },
];

export default function Navbar({ auth }) {
    const [opened, toggleOpened] = useBooleanToggle(false);
    const { classes, cx } = useStyles();

    const { component } = usePage();

    const navLinks = links.map((link) => (
        <Link
            key={link.label}
            href={route(link.link)}
            className={cx(classes.link, {
                [classes.linkActive]: component == link.name,
            })}
        >
            {link.label}
        </Link>
    ));

    return (
        <Header height={HEADER_HEIGHT} className={classes.root}>
            <Container className={classes.header}>
                <Link href={route("home")} as="h3" className={classes.logo}>
                    H4ME
                </Link>

                <Group spacing={5} className={classes.links}>
                    {navLinks}
                    <Group position="center">
                        <Authentication auth={auth} />
                        {auth.user && (
                            <ProfileDropDown username={auth.user.name} />
                        )}
                    </Group>
                </Group>
                <Burger
                    opened={opened}
                    onClick={() => toggleOpened()}
                    className={classes.burger}
                    size="sm"
                />

                <Transition transition="fade" duration={200} mounted={opened}>
                    {(styles) => (
                        <Paper
                            className={classes.dropdown}
                            withBorder
                            style={styles}
                        >
                            {navLinks}
                            <Authentication auth={auth} />
                        </Paper>
                    )}
                </Transition>
            </Container>
        </Header>
    );
}
