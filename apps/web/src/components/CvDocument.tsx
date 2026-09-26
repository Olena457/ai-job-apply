import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { TailoredCv } from "../types/analysis";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "/fonts/Roboto-Regular.ttf" },
    { src: "/fonts/Roboto-Bold.ttf", fontWeight: 700 },
  ],
});
Font.registerHyphenationCallback((word) => [word]); 

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontFamily: "Roboto",
    fontSize: 10,
    lineHeight: 1.4,
    color: "#222",
  },
  name: { fontSize: 22, fontWeight: 700 },
  headline: { fontSize: 12, color: "#1976d2", marginBottom: 4 },
  contacts: { fontSize: 9, color: "#555", marginBottom: 10 },
  h2: {
    fontSize: 11,
    fontWeight: 700,
    textTransform: "uppercase",
    borderBottom: "1pt solid #ccc",
    marginTop: 12,
    marginBottom: 6,
  },
  roleRow: { flexDirection: "row", justifyContent: "space-between" },
  bold: { fontWeight: 700 },
  bulletRow: { flexDirection: "row", marginBottom: 2 },
  bullet: { width: 10 },
  bulletText: { flex: 1 },
  job: { marginBottom: 8 },
});

export default function CvDocument({ cv }: { cv: TailoredCv }) {
  return (
    <Document title={`${cv.fullName} CV`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{cv.fullName}</Text>
        <Text style={styles.headline}>{cv.headline}</Text>
        <Text style={styles.contacts}>{cv.contacts.join("  |  ")}</Text>

        <Text style={styles.h2}>Summary</Text>
        <Text>{cv.summary}</Text>

        <Text style={styles.h2}>Skills</Text>
        <Text>{cv.skills.join(", ")}</Text>

        <Text style={styles.h2}>Experience</Text>
        {cv.experience.map((e, i) => (
          <View key={i} style={styles.job} wrap={false}>
            <View style={styles.roleRow}>
              <Text style={styles.bold}>
                {e.role}, {e.company}
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

        <Text style={styles.h2}>Education</Text>
        {cv.education.map((ed, i) => (
          <Text key={i}>
            <Text style={styles.bold}>{ed.title}</Text> {ed.details}
          </Text>
        ))}
      </Page>
    </Document>
  );
}
