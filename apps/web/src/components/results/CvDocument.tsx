
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { TailoredCv } from "../../types/analysis";

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

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Roboto",
    fontSize: 10,
    lineHeight: 1.4,
  },

  leftColumn: {
    width: "35%",
    backgroundColor: "#5a85b5",
    color: "#fff",
    padding: 20,
  },

  photoContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  photo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    objectFit: "cover",
  },

  contacts: { fontSize: 9, marginBottom: 4, color: "#e0e0e0" },
  sectionTitleLeft: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    borderBottom: "1pt solid #8faecc",
    paddingBottom: 4,
    marginTop: 16,
    marginBottom: 8,
  },
  skillItem: { marginBottom: 3 },

  rightColumn: { width: "65%", padding: 20, color: "#222" },
  name: {
    fontSize: 22,
    fontWeight: 700,
    textTransform: "uppercase",
    color: "#333",
  },
  headline: {
    fontSize: 11,
    fontWeight: 700,
    color: "#5a85b5",
    marginBottom: 12,
    textTransform: "uppercase",
  },
  sectionTitleRight: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    borderBottom: "1pt solid #ccc",
    paddingBottom: 4,
    marginTop: 12,
    marginBottom: 8,
    color: "#5a85b5",
  },

  bold: { fontWeight: 700 },
  paragraph: { marginBottom: 8 },

  itemBlock: { marginBottom: 10 },
  roleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  bulletRow: { flexDirection: "row", marginBottom: 2 },
  bullet: { width: 10 },
  bulletText: { flex: 1 },
});

interface CvDocumentProps {
  cv: TailoredCv;
  photoData?: string | null;
}

export default function CvDocument({ cv, photoData }: CvDocumentProps) {
  return (
    <Document title={`${cv.fullName} CV`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.leftColumn}>
          {photoData && (
            <View style={styles.photoContainer}>
              <Image src={photoData} style={styles.photo} alt="Profile photo" />
            </View>
          )}

          <Text style={styles.sectionTitleLeft}>Contact Info</Text>
          {cv.contacts.map((contact, i) => (
            <Text key={i} style={styles.contacts}>
              {contact}
            </Text>
          ))}

          <Text style={styles.sectionTitleLeft}>Tech Skills</Text>
          {cv.skills.map((skill, i) => (
            <Text key={i} style={styles.skillItem}>
              • {skill}
            </Text>
          ))}

          <Text style={styles.sectionTitleLeft}>Education</Text>
          {cv.education.map((ed, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <Text style={styles.bold}>{ed.title}</Text>
              <Text>{ed.details}</Text>
            </View>
          ))}
        </View>

        <View style={styles.rightColumn}>
          <Text style={styles.name}>{cv.fullName}</Text>
          <Text style={styles.headline}>{cv.headline}</Text>

          <Text style={styles.sectionTitleRight}>Summary</Text>
          <Text style={styles.paragraph}>{cv.summary}</Text>

          {cv.projects && cv.projects.length > 0 && (
            <>
              <Text style={styles.sectionTitleRight}>Projects</Text>
              {cv.projects.map((p, i) => (
                <View key={i} style={styles.itemBlock} wrap={false}>
                  <Text style={styles.bold}>
                    {p.title} [{p.techStack}]
                  </Text>
                  <Text>{p.description}</Text>
                </View>
              ))}
            </>
          )}

          <Text style={styles.sectionTitleRight}>Work Experience</Text>
          {cv.experience.map((e, i) => (
            <View key={i} style={styles.itemBlock} wrap={false}>
              <View style={styles.roleRow}>
                <Text style={styles.bold}>
                  {e.company} — {e.role}
                </Text>
                <Text>{e.period}</Text>
              </View>
              {e.bullets.map((b, j) => (
                <View key={j} style={styles.bulletRow}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>{b}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}