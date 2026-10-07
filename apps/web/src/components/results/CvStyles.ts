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
    fontSize: 9.5,
    lineHeight: 1.3,
  },

  leftColumn: {
    width: "32%",
    color: "#fff",
    padding: "20px 15px",
  },

  photoContainer: {
    marginBottom: 12,
    alignItems: "center",
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    objectFit: "cover",
  },

  contacts: { fontSize: 8.5, marginBottom: 2, color: "#e0e0e0" },
  sectionTitleLeft: {
    fontSize: 10,
    fontWeight: 700,
    textTransform: "uppercase",
    borderBottom: "1pt solid #8faecc", 
    paddingBottom: 2,
    marginTop: 12,
    marginBottom: 6,
  },

  skillText: {
    fontSize: 8.5,
    lineHeight: 1.5,
  },

  rightColumn: { width: "68%", padding: "20px 20px 20px 15px", color: "#222" },
  name: {
    fontSize: 19,
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#333",
    lineHeight: 1.1,     
    marginBottom: 4,
  },
  headline: {
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  sectionTitleRight: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    borderBottomWidth: 1, 
    borderBottomStyle: "solid",
    paddingBottom: 2,
    marginTop: 10,
    marginBottom: 6,
  },

  bold: { fontWeight: 700 },
  paragraph: { marginBottom: 8 },

  itemBlock: { marginBottom: 8 },
  roleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  bulletRow: { flexDirection: "row", marginBottom: 1 },
  bullet: { width: 10 },
  bulletText: { flex: 1 },
});
