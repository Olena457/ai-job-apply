import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import type { ProjectWithDate, TailoredCv } from "../../types/analysis";
import { styles } from "./CvStyles"; 
import { parseDateForSort } from "./cvUtils"; 

interface CvDocumentProps {
  cv: TailoredCv;
  photoData?: string | null;
  themeColor?: string;
}

export default function CvDocument({
  cv,
  photoData,
  themeColor = "#5a85b5", 
}: CvDocumentProps) {
  const sortedExperience = [...cv.experience].sort(
    (a, b) => parseDateForSort(b.period) - parseDateForSort(a.period),
  );

  const sortedProjects = cv.projects
    ? [...cv.projects].sort((a, b) => {
        const projA = a as unknown as ProjectWithDate;
        const projB = b as unknown as ProjectWithDate;

        return (
          parseDateForSort(projB.period || projB.date) -
          parseDateForSort(projA.period || projA.date)
        );
      })
    : [];

  return (
    <Document title={`${cv.fullName} CV`}>
      <Page size="A4" style={styles.page}>
        <View style={[styles.leftColumn, { backgroundColor: themeColor }]}>
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
          <Text style={styles.skillText}>{cv.skills.join(" • ")}</Text>

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

          <Text style={[styles.headline, { color: themeColor }]}>
            {cv.headline}
          </Text>

          <Text
            style={[
              styles.sectionTitleRight,
              { color: themeColor, borderBottomColor: themeColor },
            ]}
          >
            Summary
          </Text>
          <Text style={styles.paragraph}>{cv.summary}</Text>

          {sortedProjects && sortedProjects.length > 0 && (
            <>
              <Text
                style={[
                  styles.sectionTitleRight,
                  { color: themeColor, borderBottomColor: themeColor },
                ]}
              >
                Projects
              </Text>
              {sortedProjects.map((p, i) => (
                <View key={i} style={styles.itemBlock} wrap={false}>
                  <Text style={styles.bold}>
                    {p.title} [{p.techStack}]
                  </Text>
                  <Text>{p.description}</Text>
                </View>
              ))}
            </>
          )}

          <Text
            style={[
              styles.sectionTitleRight,
              { color: themeColor, borderBottomColor: themeColor },
            ]}
          >
            Work Experience
          </Text>
          {sortedExperience.map((e, i) => (
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
