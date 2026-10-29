import { Font, StyleSheet } from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Me5Q.ttf" },
    {
      src: "https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmWUlvAw.ttf",
      fontWeight: 700,
    },
  ],
});
Font.registerHyphenationCallback((word) => [word]);

export const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Roboto",
    fontSize: 9,
    lineHeight: 1.35,
    backgroundColor: "#ffffff",
  },

  leftColumn: {
    width: "32%",
    backgroundColor: "#2c3e50",
    color: "#fff",
    padding: "18px 12px",
  },

  photoContainer: {
    marginBottom: 12,
    alignItems: "center",
  },
  photo: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    objectFit: "cover",
    border: "2pt solid #fff",
  },

  sectionTitleLeft: {
    fontSize: 9.5,
    fontWeight: 700,
    textTransform: "uppercase",
    borderBottom: "1pt solid #1abc9c",
    paddingBottom: 2,
    marginTop: 10,
    marginBottom: 5,
    letterSpacing: 0.5,
  },

  skillText: {
    fontSize: 8,
    lineHeight: 1.4,
    color: "#ecf0f1",
  },

  rightColumn: {
    width: "68%",
    padding: "18px 18px 18px 15px",
    color: "#2c3e50",
  },

  name: {
    fontSize: 18,
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#2c3e50",
    lineHeight: 1.1,
    marginBottom: 2,
  },

  headline: {
    fontSize: 9.5,
    fontWeight: 700,
    color: "#16a085",
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 0.5,
  },

  contactsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 8,
    color: "#555",
    marginBottom: 10,
    gap: 4,
  },
  contactItem: {
    marginRight: 6,
    color: "#2980b9",
  },

  sectionTitleRight: {
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#2c3e50",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "#bdc3c7",
    paddingBottom: 2,
    marginTop: 8,
    marginBottom: 5,
    letterSpacing: 0.5,
  },

  bold: { fontWeight: 700 },
  paragraph: { marginBottom: 6, color: "#34495e" },

  itemBlock: { marginBottom: 6 },
  roleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  bulletRow: { flexDirection: "row", marginBottom: 2 },
  bullet: { width: 8, color: "#16a085" },
  bulletText: { flex: 1, color: "#34495e" },

  projectBlock: {
    marginBottom: 6,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: 700,
    fontSize: 9,
  },
  projectTech: {
    fontSize: 8,
    color: "#7f8c8d",
    marginBottom: 1,
  },
});
