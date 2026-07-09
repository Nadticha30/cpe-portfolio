import re

path = 'd:/สหกิจ/cv/index.html'
with open(path, 'rb') as f:
    content = f.read().decode('utf-8')

new_certs = """    <!-- ===== CERTIFICATES ===== -->
    <section class="reveal">
        <div class="section-label">// credentials</div>
        <h2 class="section-title">เกียรติบัตร <span>ที่ได้รับ</span></h2>
        <div class="certs-grid">

            <div class="cert-card" onclick="openLightbox('images/cert_hackathon3.png', 'PSRU Cyber Hackathon #3')">
                <div class="cert-img-wrapper">
                    <div class="cert-badge">🏆 Competition</div>
                    <img class="cert-img" src="images/cert_hackathon3.png" alt="PSRU Cyber Hackathon #3" loading="lazy">
                    <div class="cert-img-overlay"><span class="cert-view-btn">🔍 VIEW FULL</span></div>
                </div>
                <div class="cert-info">
                    <div class="cert-title">PSRU Cyber Hackathon #3</div>
                    <div class="cert-meta">
                        <span class="cert-meta-issuer">PSRU × NCSA × กฟผ.</span>
                        <span>มี.ค. 2569</span>
                    </div>
                </div>
            </div>

            <div class="cert-card" onclick="openLightbox('images/cert_cyber30.png', 'Getting Started in Cybersecurity 3.0')">
                <div class="cert-img-wrapper">
                    <div class="cert-badge">🔐 Cybersecurity</div>
                    <img class="cert-img" src="images/cert_cyber30.png" alt="Getting Started in Cybersecurity 3.0" loading="lazy">
                    <div class="cert-img-overlay"><span class="cert-view-btn">🔍 VIEW FULL</span></div>
                </div>
                <div class="cert-info">
                    <div class="cert-title">Getting Started in Cybersecurity 3.0</div>
                    <div class="cert-meta">
                        <span class="cert-meta-issuer">ความมั่นคงปลอดภัยไซเบอร์</span>
                        <span>มิ.ย. 2569</span>
                    </div>
                </div>
            </div>

            <div class="cert-card" onclick="openLightbox('images/cert_python.png', 'Python Essentials 1 — Cisco Networking Academy')">
                <div class="cert-img-wrapper">
                    <div class="cert-badge">🐍 Python</div>
                    <img class="cert-img" src="images/cert_python.png" alt="Python Essentials 1" loading="lazy">
                    <div class="cert-img-overlay"><span class="cert-view-btn">🔍 VIEW FULL</span></div>
                </div>
                <div class="cert-info">
                    <div class="cert-title">Python Essentials 1</div>
                    <div class="cert-meta">
                        <span class="cert-meta-issuer">Cisco Networking Academy</span>
                        <span>ธ.ค. 2568</span>
                    </div>
                </div>
            </div>

            <div class="cert-card" onclick="openLightbox('images/cert_cyberlab.png', 'Basic Cybersecurity Lab Course')">
                <div class="cert-img-wrapper">
                    <div class="cert-badge">🛡️ Lab Course</div>
                    <img class="cert-img" src="images/cert_cyberlab.png" alt="Basic Cybersecurity Lab Course" loading="lazy">
                    <div class="cert-img-overlay"><span class="cert-view-btn">🔍 VIEW FULL</span></div>
                </div>
                <div class="cert-info">
                    <div class="cert-title">Basic Cybersecurity Lab Course</div>
                    <div class="cert-meta">
                        <span class="cert-meta-issuer">ทักษะปฏิบัติการไซเบอร์</span>
                        <span>ก.พ. 2569</span>
                    </div>
                </div>
            </div>

            <div class="cert-card" onclick="openLightbox('images/cert_digital.jpg', 'โครงการพัฒนาสมรรถนะและทักษะดิจิทัล')">
                <div class="cert-img-wrapper">
                    <div class="cert-badge">💡 Digital Skills</div>
                    <img class="cert-img" src="images/cert_digital.jpg" alt="โครงการพัฒนาสมรรถนะและทักษะดิจิทัล" loading="lazy">
                    <div class="cert-img-overlay"><span class="cert-view-btn">🔍 VIEW FULL</span></div>
                </div>
                <div class="cert-info">
                    <div class="cert-title">โครงการพัฒนาสมรรถนะและทักษะดิจิทัล</div>
                    <div class="cert-meta">
                        <span class="cert-meta-issuer">PSRU Digital Test</span>
                        <span>ก.พ. 2569</span>
                    </div>
                </div>
            </div>

            <div class="cert-card" onclick="openLightbox('images/cert_dataviz.png', 'Data Visualization &amp; Dashboard Design')">
                <div class="cert-img-wrapper">
                    <div class="cert-badge">📊 Data Viz</div>
                    <img class="cert-img" src="images/cert_dataviz.png" alt="Data Visualization and Dashboard Design" loading="lazy">
                    <div class="cert-img-overlay"><span class="cert-view-btn">🔍 VIEW FULL</span></div>
                </div>
                <div class="cert-info">
                    <div class="cert-title">Data Visualization &amp; Dashboard Design</div>
                    <div class="cert-meta">
                        <span class="cert-meta-issuer">การออกแบบแดชบอร์ด</span>
                        <span>มี.ค. 2569</span>
                    </div>
                </div>
            </div>

        </div>
    </section>"""

pattern = r'<!-- ===== CERTIFICATES ===== -->.*?</section>\s*\n\s*<!-- ===== PHILOSOPHY ===== -->.*?</section>'
replacement = new_certs
new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

if new_content == content:
    print('ERROR: Pattern not matched!')
    idx = content.find('<!-- ===== CERTIFICATES')
    print('CERT section found at char:', idx)
else:
    with open(path, 'wb') as f:
        f.write(new_content.encode('utf-8'))
    print('SUCCESS! Old:', len(content), '-> New:', len(new_content), 'chars')
    print('Philosophy removed:', 'philosophy-grid' not in new_content)
    print('New cert cards present:', 'cert_hackathon3.png' in new_content)
